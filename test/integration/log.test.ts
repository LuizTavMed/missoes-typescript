// imports
import App from '../../src/api/App'
import MariadbTest from '../../src/data/MariadbTest'
import Crypto from '../../src/helper/Crypto'
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

import * as request from 'supertest'

const mariadbTest = new MariadbTest([LogEntity, UserEntity])
const crypto = new Crypto()
const logRepository = new LogRepository(mariadbTest.dataSource, LogEntity)
const logValidator = new LogValidator()
const logController = new LogController(logRepository, logValidator)
const logRouter = new LogRouter(logController)
const userRepository = new UserRepository(mariadbTest.dataSource, UserEntity, crypto)
const userValidator = new UserValidator()
const userController = new UserController(userRepository, userValidator)
const userRouter = new UserRouter(userController)

describe('Log Integration test', () => {
  const app = new App(logRouter, userRouter)

  beforeEach(async () => {
    app.start()
    await mariadbTest.start()
  })

  afterEach(async () => {
    await mariadbTest.stop()
    app.stop()
  })

  test('Should be able to save a log', async () => {
    const res = await request(app.express).post('/api/log').send({ message: 'test message' })
    expect(res.status).toEqual(200)
    expect(res.body.id).toBeDefined()
    expect(res.body.message).toEqual('test message')
    expect(res.body.date).toBeDefined()
  })

  test('Should return all logs from the database in a array', async () => {
    await request(app.express).post('/api/log').send({ message: 'first log' })
    await request(app.express).post('/api/log').send({ message: 'second log' })
    await request(app.express).post('/api/log').send({ message: 'third log' })
    const res = await request(app.express).get('/api/log/')
    expect(res.status).toEqual(200)
    expect(res.body.length).toEqual(3)
  })

  test('Should fetch a specific log', async () => {
    await request(app.express).post('/api/log').send({ message: 'first log' })
    let res = await request(app.express).post('/api/log').send({ message: 'second log' })
    const log = res.body
    const logId: number = log.id
    await request(app.express).post('/api/log').send({ message: 'third log' })
    res = await request(app.express).get(`/api/log/${logId}`)
    expect(res.body).toEqual(log)
    expect(res.status).toEqual(200)
  })
})
