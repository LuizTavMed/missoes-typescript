import type ILogValidator from '../interface/ILogValidator'

enum LogErrorMessage {
  INVALID_MESSAGE = 'Invalid message',
}

class LogValidator implements ILogValidator {
  validate (message: unknown): void {
    if (message === '' || message == null) throw new Error(LogErrorMessage.INVALID_MESSAGE)
  }
}

export default LogValidator
