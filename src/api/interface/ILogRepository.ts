import type ILog from './ILog'
import type IOracledbDataSource from './IOracledbDataSource'

interface ILogRepository {
  readonly dataSource: IOracledbDataSource

  create: (id: string, message: string, date: string) => Promise<ILog>
  getAll: () => Promise<ILog[]>
  get: (id: string) => Promise<ILog | null>
}

export default ILogRepository
