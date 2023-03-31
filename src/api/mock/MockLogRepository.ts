
import type LogEntity from '../entity/LogEntity'
import type ILogRepository from '../interface/ILogRepository'

class MockLogRepository implements ILogRepository {
  private readonly logs: LogEntity[]
  constructor () {
    this.logs = []
  }
}

export default MockLogRepository
