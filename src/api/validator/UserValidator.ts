import type IUserValidator from '../interface/IUserValidator'

class UserValidator implements IUserValidator {
  isUserValid (login: unknown, password: unknown, permission: unknown): boolean {
    console.log(login, password, permission)
    if (this.isLoginEmpty(login) || this.isPasswordsEmpty(password) || this.isPermissionEmpty(permission)) {
      return false
    } else {
      return true
    }
  }

  isLoginEmpty (login: unknown): boolean {
    if (login == '' || null || undefined) {
      return true
    } else {
      return false
    }
  }

  isPasswordsEmpty (passwords: unknown): boolean {
    if (passwords == '' || null || undefined) {
      return true
    } else {
      return false
    }
  }

  isPermissionEmpty (permission: unknown): boolean {
    if (permission == '' || null || undefined) {
      return true
    } else {
      return false
    }
  }
}

export default UserValidator
