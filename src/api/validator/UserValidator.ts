import type IUserValidator from '../interface/IUserValidator'

class UserValidator implements IUserValidator {
  isUserValid (login: string, password: string, permission: string): boolean {
    console.log(login, password, permission)
    if (!this.isLoginEmpty(login) && !this.isPasswordsEmpty(password) && !this.isPermissionEmpty(permission)) {
      return true
    } else {
      return false
    }
  }

  isLoginEmpty (login: string): boolean {
    if (login == null) {
      return true
    } else {
      return false
    }
  }

  isPasswordsEmpty (passwords: string): boolean {
    if (passwords == null) {
      return true
    } else {
      return false
    }
  }

  isPermissionEmpty (permission: string): boolean {
    if (permission == null) {
      return true
    } else {
      return false
    }
  }
}

export default UserValidator
