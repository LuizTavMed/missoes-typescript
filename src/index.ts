// importando classes
import App from './api/App'
import Mariadb from './data/Mariadb'
import LogRouter from './api/router/LogRouter'
import LogController from './api/controller/LogController'
import LogRepository from './api/repository/LogRepository'
import LogValidator from './api/validator/logValidator'
import LogEntity from './api/entity/LogEntity'

// importando .env
import * as dotenv from 'dotenv-safe'
dotenv.config()

// instanciando classes
const mariadb = new Mariadb()
const logRepository = new LogRepository(mariadb.dataSource, LogEntity)
const logValidator = new LogValidator()
const logController = new LogController(logRepository, logValidator)
const logRouter = new LogRouter(logController)
const app = new App(logRouter)

// iniciando banco de dados e app
void mariadb.start()
app.start()
