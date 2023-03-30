// importando core da rota
import * as express from 'express'
import { type Request, type Response } from 'express'

// importando service da rota
import LogController from '../controller/LogController'
const logController = new LogController()

// criando rotas
const logRoutes = express.Router()

logRoutes.post('/logs', (req: Request, res: Response) => {
  logController.create(req, res)
})
logRoutes.get('/logs', (req: Request, res: Response) => {
  logController.getAll(req, res)
})
logRoutes.get('/logs/:id', (req: Request, res: Response) => {
  logController.get(req, res)
})
logRoutes.patch('/logs/:id', (req: Request, res: Response) => {
  logController.update(req, res)
})
logRoutes.delete('/logs/:id', (req: Request, res: Response) => {
  logController.delete(req, res)
})

export default logRoutes
