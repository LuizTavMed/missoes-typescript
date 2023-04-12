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

void mariadb.dataSource.initialize().then(() => {
  const app = new App(logRouter)
  console.log('banco de dados inicializado')
  app.express.listen(process.env.PORT_API, () => {
    console.log('aplicação iniciada na porta ', process.env.PORT_API)
  })
}
)
