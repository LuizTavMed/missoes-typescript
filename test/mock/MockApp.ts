
import type LogEntity from '../../src/api/entity/LogEntity'
import type IApp from '../../src/api/interface/IApp'

class MockApp implements IApp {
  private readonly logs: LogEntity[]
  constructor () {
    this.logs = []
  }
}

export default MockApp
