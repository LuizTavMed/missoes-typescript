// imports
import App from '../../src/api/App'
import MariadbTest from '../../src/data/MariadbTest'
import LogRouter from '../../src/api/router/LogRouter'
import LogController from '../../src/api/controller/LogController'
import LogRepository from '../../src/api/repository/LogRepository'
import LogValidator from '../../src/api/validator/LogValidator'
import LogEntity from '../../src/api/entity/LogEntity'
import UserRouter from '../../src/api/router/UserRouter'
import UserController from '../../src/api/controller/UserController'
import UserRepository from '../../src/api/repository/UserRepository'
import UserValidator from '../../src/api/validator/UserValidator'
import UserEntity from '../../src/api/entity/UserEntity'

import request from 'supertest'
import * as dotenv from 'dotenv-safe'

test('Integration test', async () => {
  const mariadbTest = new MariadbTest([LogEntity, UserEntity])
  const logRepository = new LogRepository(mariadbTest.dataSource, LogEntity)
  const logValidator = new LogValidator()
  const logController = new LogController(logRepository, logValidator)
  const logRouter = new LogRouter(logController)
  const userRepository = new UserRepository(mariadbTest.dataSource, UserEntity)
  const userValidator = new UserValidator()
  const userController = new UserController(userRepository, userValidator)
  const userRouter = new UserRouter(userController)
  const app = new App(logRouter, userRouter)
  let res = await request(app.express).get('localhost:4000/api/users')
  console.log('res:', res)
  res = await request(app.express).post('localhost:4000/api/users')
  console.log('res:', res)
  res = await request(app.express).patch('localhost:4000/api/users')
  console.log('res:', res)
  res = await request(app.express).delete('localhost:4000/api/users')
  console.log('res:', res)
  beforeAll(async () => {
    dotenv.config()
    void mariadbTest.start()
    app.start()
  })

  afterAll(async () => {
    void mariadbTest.stop()
  })
})
