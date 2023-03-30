// importando .env
// importando rotas
import logRoutes from './route/logRoutes'

// importando core da api
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

require('dotenv-safe').config({ silent: true })

// criando o app
const app = express()

// aplicando middlewares
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// utilizando rotas da api
app.use('/api', logRoutes)

export default app
