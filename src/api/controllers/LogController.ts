import {Request,Response} from "express"

import UserValidator from "../validators/userValidator"
const userValidator = new UserValidator()

import UserService from "../services/userService"
const userService = new UserService()

enum UserError{
    USER_INVALID_REQUEST = "A requisição inserida foi considerada inválida",
    USER_LIST_ERROR = "Houve um erro quando tentamos buscar a lista",
    USER_NOT_FOUND = "Não foi possível encontrar este usuário",
    USER_NOT_UPDATED = "Não foi possível atualizar este usuário",
    USER_NOT_DELETED = "Não foi possível deletar este usuário"
}
class UserController{
    
    async create(req: Request, res: Response){
        try{
            const user = await userService.create(req)
            res.status(200).json(user)
        } catch(erro){
            console.error(erro)
            res.status(400).send(UserError.USER_INVALID_REQUEST)
        }
        
    }

    async getAll(req: Request, res: Response){
        try{
           const listaUsers = await userService.getAll() 
            res.status(200).json(listaUsers)
        } catch(erro){
            console.error(erro)
            res.status(400).send(UserError.USER_INVALID_REQUEST)
        }
    }

    async getById(req: Request, res: Response){
        try{
            const user = await userService.getById(req)
            if (user != null){
                res.status(200).json(user)
            }
            else{
                res.status(404).send(UserError.USER_NOT_FOUND)
            }
        } catch(erro){
            res.status(400).send(UserError.USER_INVALID_REQUEST)
        }
    }

    async updateById(req: Request, res: Response){
        try{
            const user = await userService.updateById(req)
            if (user != undefined){
                res.status(200).json(user)
            }
            else{
                res.status(404).send(UserError.USER_NOT_UPDATED)
            }
        } catch(erro){
            console.log(erro)
            res.status(400).send(UserError.USER_INVALID_REQUEST)
        }
    }

    async removeById(req: Request, res: Response){
        try{
            const user = await userService.removeById(req)
            if (user != null){
                res.status(200).json(user)
            }
            else{
                res.status(404).send(UserError.USER_NOT_DELETED)
            }
        } catch(erro){
            console.error(erro)
            res.status(400).send(UserError.USER_INVALID_REQUEST)
        }
    }

}

export default UserController