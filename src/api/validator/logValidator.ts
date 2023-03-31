import type ILogValidator from '../interface/ILogValidator'

class LogValidator implements ILogValidator {
  messageIsEmpty (message: string): boolean {
    if (message == null) {
      return true
    } else {
      return false
    }
  }
}

export default LogValidator
