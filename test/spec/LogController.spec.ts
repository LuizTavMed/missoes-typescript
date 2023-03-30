import LogController from '../../src/api/controller/LogController'
import LogService from '../../src/api/service/LogService'
import { type MockProxy, mock } from 'jest-mock-extended'
import type ILogService from '../../src/interface/ILogService'
import type Log from '../../src/api/model/Log'

const error = new Error('Fake Error')
const logFake = {
  id: 1,
  message: 'any log message',
  date: new Date()
}

describe('Controller', () => {
  let logService: MockProxy<ILogService>
  let logController: LogController

  beforeEach(() => {
    logService = mock()
    logController = new LogController(logService)
  })
  it('Deve retornar um statusCode 400 se o logService lançar uma exceção ', async () => {
    logService.create.mockRejectedValueOnce(error)

    const rs: Log = await logController.create(logFake)
    expect(rs.status).toBe(400)
  })
})
