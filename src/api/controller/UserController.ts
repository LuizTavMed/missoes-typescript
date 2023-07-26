import { type Request, type Response } from 'express'

import type IUserController from '../interface/IUserController'
import type IUserService from '../interface/IUserService'
import type IUserValidator from '../interface/IUserValidator'

enum UserErrorMessage {
  UNKNOWN = 'Unknown error during request',
  NOT_FOUND = 'The user could not be found',
}

class UserController implements IUserController {
  constructor (readonly userService: IUserService, readonly userValidator: IUserValidator) {}

  async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      await this.userValidator.validate(req.body.login, req.body.password, req.body.email, req.body.type)
      const user = await this.userService.create(req.body.login, req.body.password, req.body.email, req.body.type)
      return res.status(200).json(user)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message)
      }
      return res.status(500).send(UserErrorMessage.UNKNOWN)
    }
  }

  async getAll (res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const userList = await this.userService.getAll()
      return res.status(200).json(userList)
    } catch (error) {
      return res.status(500).send(UserErrorMessage.UNKNOWN)
    }
  }

  async get (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.userService.get(req.params.id)
      if (user != null) {
        return res.status(200).json(user)
      }
    } catch (err) {
      console.error(err)
    }
    return res.status(500).send(UserErrorMessage.NOT_FOUND)
  }

  async update (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.userService.update(req.params.id, req.body)
      if (user !== null) {
        return res.status(200).json(user)
      } else {
        return res.status(404).send(UserErrorMessage.NOT_FOUND)
      }
    } catch (erro) {
      return res.status(500).send(UserErrorMessage.UNKNOWN)
    }
  }

  async delete (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const user = await this.userService.delete(req.params.id)
      if (user != null) {
        return res.status(200).json(user)
      } else {
        return res.status(404).send(UserErrorMessage.NOT_FOUND)
      }
    } catch (err) {
      return res.status(500).send(UserErrorMessage.UNKNOWN)
    }
  }
}

export default UserController
