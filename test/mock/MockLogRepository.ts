
import type LogEntity from '../../src/api/entity/LogEntity'
import type ILogRepository from '../../src/api/interface/ILogRepository'

class MockLogRepository implements ILogRepository {
  private readonly logs: LogEntity[]
  constructor () {
    this.logs = []
  }
}

export default MockLogRepository
