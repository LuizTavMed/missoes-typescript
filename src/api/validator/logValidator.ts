import type { Request } from 'express'

class LogValidator {
  messageIsEmpty (req: Request): boolean {
    if (req.body.message == null) {
      return true
    } else {
      return false
    }
  }
}

export default LogValidator
