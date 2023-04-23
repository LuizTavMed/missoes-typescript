import type ILogValidator from '../interface/ILogValidator'

class LogValidator implements ILogValidator {

  isValid(message: string): boolean {
    if (message == '' || message == undefined || message == null){
      return false
    }
    else{
      return true
    }
  }
}

export default LogValidator
