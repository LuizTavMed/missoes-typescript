// importing external libraries
import { Server } from 'http'
import * as request from 'supertest'
import * as express from 'express'

// importing helpers
import Api from '../../helper/Api'
import TokenManager from '../../helper/TokenManager'
import ApiMiddleware from '../../helper/ApiMiddleware'
import Crypto from '../../helper/Crypto'
import Sleeper from '../../helper/Sleeper'
import UuidGenerator from '../../helper/UuidGenerator'
import FileManager from '../../helper/FileManager'
import DateManager from '../../helper/DateManager'

// importing data classes
import LocalStorage from '../../data/LocalStorage'
import OracledbDataSourceTest from '../../data/OracledbDataSourceTest'

// importing routers
import FileRouter from '../../api/router/FileRouter'
import LogRouter from '../../api/router/LogRouter'
import UserRouter from '../../api/router/UserRouter'
import AuthRouter from '../../api/router/AuthRouter'

// importing controllers
import FileController from '../../api/controller/FileController'
import LogController from '../../api/controller/LogController'
import UserController from '../../api/controller/UserController'
import AuthController from '../../api/controller/AuthController'

// importing validators
import FileValidator from '../../api/validator/FileValidator'
import LogValidator from '../../api/validator/LogValidator'
import UserValidator from '../../api/validator/UserValidator'

// importing services
import LogService from '../../api/service/LogService'
import UserService from '../../api/service/UserService'
import AuthService from '../../api/service/AuthService'
import FileService from '../../api/service/FileService'

// importing repositories
import FileRepository from '../../api/repository/FileRepository'
import LogRepository from '../../api/repository/LogRepository'
import UserRepository from '../../api/repository/UserRepository'

// importing app
import App from '../../api/App'

// instanciating helpers
const crypto = new Crypto()
const sleeper = new Sleeper()
const uuidGenerator = new UuidGenerator()
const dateManager = new DateManager()
const tokenManager = new TokenManager()
const fileManager = new FileManager()
const server = new Server()
const apiMiddleware = new ApiMiddleware()

// instanciating data classes
const oracledbDataSourceTest = new OracledbDataSourceTest()
const localStorage = new LocalStorage()

// instanciating repositories
// using repositories with oracledb
const fileRepository = new FileRepository(oracledbDataSourceTest, fileManager, uuidGenerator)
const logRepository = new LogRepository(oracledbDataSourceTest, uuidGenerator, dateManager)
const userRepository = new UserRepository(oracledbDataSourceTest)

// instanciating services
const logService = new LogService(logRepository, uuidGenerator, dateManager)
const fileService = new FileService(fileRepository, fileManager, uuidGenerator, sleeper)
const userService = new UserService(userRepository, crypto, uuidGenerator, dateManager)
const authService = new AuthService(userRepository, crypto, tokenManager)

// instanciating validators
const logValidator = new LogValidator()
const fileValidator = new FileValidator()
const userValidator = new UserValidator(userRepository)

// instanciating controllers
const fileController = new FileController(fileService, fileValidator, fileManager, sleeper)
const logController = new LogController(logService, logValidator)
const userController = new UserController(userService, userValidator)
const authController = new AuthController(authService, userRepository, crypto, tokenManager)

// instanciating routers
const fileRouter = new FileRouter(fileController, localStorage)
const logRouter = new LogRouter(logController)
const userRouter = new UserRouter(userController)
const authRouter = new AuthRouter(authController)

// instanciating app related classes
const api = new Api(express(), apiMiddleware, fileRouter, logRouter, userRouter, authRouter)

// getting .env configuration

describe('User integration tests', () => {
  const app = new App(api, server)
  beforeEach(async () => {
    app.start()
    await oracledbDataSourceTest.start()
  })

  afterEach(async () => {
    await oracledbDataSourceTest.stop()
    app.stop()
  })

  test('Should create a log', async () => {
    let res = await request(app.api.server).post('/api/log').send({
      message: 'test message'
    })
    expect(res.status).toEqual(200)
    expect(res.body.id).toBeDefined()
    expect(res.body.date).toBeDefined()
    expect(res.body.message).toEqual('test message')
    res = await request(app.api.server).post('/api/log').send({
      message: ''
    })
    expect(res.status).toEqual(400)
  })

  test('Should fetch a list with every log', async () => {
    await request(app.api.server).post('/api/log').send({
      message: 'first message'

    })
    await request(app.api.server).post('/api/log').send({
      message: 'second message'

    })
    await request(app.api.server).post('/api/log').send({
      message: 'third message'

    })
    const res = await request(app.api.server).get('/api/log')
    expect(res.status).toEqual(200)
    expect(res.body.length).toEqual(3)
  })

  test('Should fetch a specific log', async () => {
    await request(app.api.server).post('/api/log').send({
      message: 'first message'
    })
    let res = await request(app.api.server).post('/api/log').send({
      message: 'second message'
    })
    await request(app.api.server).post('/api/log').send({
      message: 'third message'
    })
    res = await request(app.api.server).get(`/api/log/${res.body.id as string}`)
    expect(res.status).toEqual(200)
    expect(res.body.id as string).toBeDefined()
    expect(res.body.date as string).toBeDefined()
    expect(res.body.message).toEqual('second message')
  })
})
