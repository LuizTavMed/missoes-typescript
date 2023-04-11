// importando classes
import App from './api/App'
import Mariadb from './data/Mariadb'
import LogRouter from './api/router/LogRouter'
import LogController from './api/controller/LogController'
import LogRepository from './api/repository/LogRepository'
import LogValidator from './api/validator/logValidator'

// importando .env
import * as dotenv from 'dotenv-safe'
dotenv.config()

// instanciando classes
const logRepository = new LogRepository()
const logValidator = new LogValidator()
const logController = new LogController(logRepository, logValidator)
const logRouter = new LogRouter(logController)
const mariadb = new Mariadb()
void mariadb.dataSource.initialize().then(() => {
  const app = new App(logRouter)
  console.log('banco de dados inicializado')
  app.express.listen(process.env.PORT_API, () => {
    console.log('aplicação iniciada na porta ', process.env.PORT_API)
  })
}
)
