
import type LogEntity from '../../src/api/entity/LogEntity'
import type ILogValidator from '../../src/api/interface/ILogValidator'

class MockLogValidator implements ILogValidator {
  private readonly logs: LogEntity[]
  constructor () {
    this.logs = []
  }
}

export default MockLogValidator
