// importando interfaces
import type IApp from './interface/IApp'
import type ILogRouter from './interface/ILogRouter'
import type IUserRouter from './interface/IUserRouter'
import type { Express } from 'express'
import { Server } from 'http'

// importando middlewares
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { config } from '../config'

class App implements IApp {
  readonly express: Express
  hasStarted: boolean = false
  server = new Server()
  constructor (readonly logRouter: ILogRouter, readonly userRouter: IUserRouter) {
    this.express = express()
    this.logRouter = logRouter
    this.userRouter = userRouter
    this.express.use(bodyParser.json())
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use('/api', logRouter.routes)
    this.express.use('/api', userRouter.routes)
  }

  start (): void {
    this.server = this.express.listen(config.api.port, () => {
      console.log('Servidor inicializado')
    })
  }

  stop (): void {
    this.server.close()
  }
}

export default App
