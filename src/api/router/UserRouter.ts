// importando core da rota
import * as express from 'express'
import { type Router, type Request, type Response } from 'express'

// importando service da rota
import type IUserController from '../interface/IUserController'
import type IUserRouter from '../interface/IUserRouter'

// criando rotas

class UserRouter implements IUserRouter {
  readonly routes: Router
  constructor (readonly userController: IUserController) {
    this.routes = express.Router()
    this.routes.post('/users', (req: Request, res: Response) => {
      void userController.create(req, res)
    })
    this.routes.get('/users', (req: Request, res: Response) => {
      void userController.getAll(res)
    })
    this.routes.get('/users/:id', (req: Request, res: Response) => {
      void userController.get(req, res)
    })
    this.routes.patch('/users/:id', (req: Request, res: Response) => {
      void userController.update(req, res)
    })
    this.routes.delete('/users/:id', (req: Request, res: Response) => {
      void userController.delete(req, res)
    })
  }
}

export default UserRouter
