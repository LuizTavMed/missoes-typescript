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

  test('Should create an user', async () => {
    let res = await request(app.api.server).post('/api/user').send({
      login: 'login',
      password: 'password',
      type: 'master',
      email: 'email@example.com'
    })
    expect(res.status).toEqual(200)
    expect(res.body.id).toBeDefined()
    expect(res.body.login).toEqual('login')
    expect(await crypto.areTheyHashmatched('password', res.body.password)).toEqual(true)
    expect(res.body.type).toEqual('master')
    expect(res.body.email).toEqual('email@example.com')
    res = await request(app.api.server).post('/api/user').send({
      login: 'login',
      password: 'password',
      type: 'master',
      email: 'diferentEmail@example.com'
    })
    expect(res.status).toEqual(400)
    res = await request(app.api.server).post('/api/user').send({
      login: 'diferentLogin',
      password: 'password',
      type: 'master',
      email: 'email@example.com'
    })
    expect(res.status).toEqual(400)
  })
  test('Should fetch a list with every user', async () => {
    await request(app.api.server).post('/api/user').send({
      login: 'firstUser',
      password: '123',
      type: 'master',
      email: 'email1@example.com'

    })
    await request(app.api.server).post('/api/user').send({
      login: 'secondUser',
      password: '456',
      type: 'common',
      email: 'email2@example.com'

    })
    await request(app.api.server).post('/api/user').send({
      login: 'thirdUser',
      password: '789',
      type: 'advanced',
      email: 'email3@example.com'

    })
    const res = await request(app.api.server).get('/api/user')
    expect(res.status).toEqual(200)
    expect(res.body.length).toEqual(3)
  })

  test('Should fetch a specific user', async () => {
    await request(app.api.server).post('/api/user').send({
      login: 'firstUser',
      password: '123',
      type: 'common',
      email: 'firstemail@example.com'
    })
    let res = await request(app.api.server).post('/api/user').send({
      login: 'secondUser',
      password: '456',
      type: 'master',
      email: 'secondemail@example.com'
    })
    await request(app.api.server).post('/api/user').send({
      login: 'thirdUser',
      password: '789',
      type: 'advanced',
      email: 'thirdemail@example.com'
    })
    res = await request(app.api.server).get(`/api/user/${res.body.id as string}`)
    expect(res.status).toEqual(200)
    expect(res.body.id).toBeDefined()
    expect(res.body.login).toEqual('secondUser')
    expect(await crypto.areTheyHashmatched('456', res.body.password)).toEqual(true)
    expect(res.body.type).toEqual('master')
    expect(res.body.email).toEqual('secondemail@example.com')
  })

  test('Should update a specific user', async () => {
    await request(app.api.server).post('/api/user').send({
      login: 'firstUser',
      password: '123',
      type: 'master',
      email: 'email1@example.com'

    })
    let res = await request(app.api.server).post('/api/user').send({
      login: 'secondUser',
      password: '456',
      type: 'common',
      email: 'email2@example.com'

    })
    const userToUpdate = res.body
    await request(app.api.server).post('/api/user').send({
      login: 'thirdUser',
      password: '789',
      type: 'advanced',
      email: 'email3@example.com'

    })
    res = await request(app.api.server).patch(`/api/user/${userToUpdate.id as string}`).send({
      password: 'newPassword',
      type: 'newType'
    })
    expect(res.status).toEqual(200)
    expect(res.body.login).toEqual(userToUpdate.login)
    expect(await crypto.areTheyHashmatched('newPassword', res.body.password)).toEqual(true)
    expect(res.body.type).toEqual('newType')
  })

  test('Should delete a specific user', async () => {
    await request(app.api.server).post('/api/user').send({
      login: 'firstUser',
      password: '123',
      type: 'master',
      email: 'email1@example.com'
    })
    let res = await request(app.api.server).post('/api/user').send({
      login: 'secondUser',
      password: '456',
      type: 'common',
      email: 'email2@example.com'
    })
    const userToDelete = res.body
    await request(app.api.server).post('/api/user').send({
      login: 'thirdUser',
      password: '789',
      type: 'advanced',
      email: 'email3@example.com'
    })
    res = await request(app.api.server).delete((`/api/user/${userToDelete.id as string}`))
    expect(res.status).toEqual(200)
    expect(res.body.login).toEqual(userToDelete.login)
    expect(res.body.password).toEqual(userToDelete.password)
  })
})
