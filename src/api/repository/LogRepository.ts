import type IOracledbDataSource from '../interface/IOracledbDataSource'
import type ILogRepository from '../interface/ILogRepository'
import type IUuidGenerator from '../interface/IUuidGenerator'
import type IDateManager from '../interface/IDateManager'
import type ILog from '../interface/ILog'

class LogRepository implements ILogRepository {
  constructor (readonly dataSource: IOracledbDataSource, readonly uuidGenerator: IUuidGenerator, readonly dateManager: IDateManager) {}

  async create (id: string, message: string, date: string): Promise<ILog> {
    const log = { id, date, message }
    await this.dataSource.insertLogRegistry(id, message, date)
    return log
  }

  async getAll (): Promise<ILog[]> {
    return await this.dataSource.getEveryLogRegistry()
  }

  async get (id: string): Promise<ILog | null> {
    const logList = await this.dataSource.getLogBy('id', id)
    const log = logList
    if (log == null) {
      return null
    }
    return log
  }
}

export default LogRepository
