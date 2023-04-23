import type IUserValidator from '../interface/IUserValidator'

class UserValidator implements IUserValidator {
  isUserValid (login: string, password: string, permission: string): boolean {
    console.log(login, password, permission)
    if (this.isLoginEmpty(login) || this.isPasswordsEmpty(password) || this.isPermissionEmpty(permission)) {
      return false
    } else {
      return true
    }
  }

  isLoginEmpty (login: string): boolean {
    if (login == '' || null || undefined) {
      return true
    } else {
      return false
    }
  }

  isPasswordsEmpty (passwords: string): boolean {
    if (passwords == '' || null || undefined) {
      return true
    } else {
      return false
    }
  }

  isPermissionEmpty (permission: string): boolean {
    if (permission == '' || null || undefined) {
      return true
    } else {
      return false
    }
  }
}

export default UserValidator
