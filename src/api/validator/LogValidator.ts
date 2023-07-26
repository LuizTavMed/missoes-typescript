import type ILogValidator from '../interface/ILogValidator'

enum LogErrorMessage {
  INVALID_MESSAGE = "The message you've inserted was considered invalid'"
}

class LogValidator implements ILogValidator {
  validate (message: string): void {
    if (message === '' || message == null) throw new Error(LogErrorMessage.INVALID_MESSAGE)
  }
}

export default LogValidator
