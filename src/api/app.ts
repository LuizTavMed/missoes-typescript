
// importando .env

// importando rotas
// importando core da api
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import LogRouter from './router/LogRouter'
import type ILogController from './interface/ILogController'

require('dotenv-safe').config({ silent: true })

// criando o app
const app = express()

// aplicando middlewares
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// utilizando rotas da api
const logRouter = new LogRouter(logController, routes)
app.use('/api', logRouter.routes)

export default app
