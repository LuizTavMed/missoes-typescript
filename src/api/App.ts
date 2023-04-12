// importando interfaces
import type IApp from './interface/IApp'
import type ILogRouter from './interface/ILogRouter'

// importando tipos
import type { Express } from 'express'

// importando middlewares
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

class App implements IApp {
  readonly express: Express
  hasStarted: boolean = false

  constructor (readonly logRouter: ILogRouter) {
    this.express = express()
    this.logRouter = logRouter
    this.express.use(bodyParser.json())
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use('/api', logRouter.routes)
  }

  start (): void {
    try {
      this.express.listen(process.env.PORT_API)
    } catch (error) {
      console.error(error)
    }
  }
}

export default App
