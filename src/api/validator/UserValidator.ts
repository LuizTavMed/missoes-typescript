import type IUserRepository from '../interface/IUserRepository'
import type IUserValidator from '../interface/IUserValidator'

enum UserErrorMessage {
  INVALID_LOGIN = 'Invalid user',
  LOGIN_ALREADY_EXISTS = 'Login already exists',
  INVALID_PASSWORD = 'Invalid user',
  INVALID_TYPE = 'Invalid type',
  INVALID_EMAIL = 'Invalid email',
  EMAIL_ALREADY_EXISTS = 'Email already exists',
}

class UserValidator implements IUserValidator {
  constructor (readonly userRepository: IUserRepository) {}
  async validate (login: string, password: string, email: string, type: string): Promise<void> {
    if (this.isEmpty(login) || this.hasInvalidCharacters(login)) throw new Error(UserErrorMessage.INVALID_LOGIN)
    if (this.isEmpty(password) || this.hasInvalidCharacters(password)) throw new Error(UserErrorMessage.INVALID_PASSWORD)
    if (this.isEmpty(email)) throw new Error(UserErrorMessage.INVALID_EMAIL)
    if (this.isEmpty(type)) throw new Error(UserErrorMessage.INVALID_TYPE)
    if (await this.loginAlreadyExists(login)) throw new Error(UserErrorMessage.LOGIN_ALREADY_EXISTS)
    if (await this.emailAlreadyExists(email)) throw new Error(UserErrorMessage.EMAIL_ALREADY_EXISTS)
  }

  isEmpty (value: string): boolean {
    if (value === '' || value == null) {
      return true
    } else {
      return false
    }
  }

  hasInvalidCharacters (value: string): boolean {
    for (let i = 0; i < value.length; i++) {
      if (value[i] === ' ' || value[i] === '!' || value[i] === '@' || value[i] === '#' || value[i] === '%') {
        return true
      }
    }
    return false
  }

  isLoginEmpty (login: string): boolean {
    if (login === '' || login === null || login === undefined) {
      return true
    } else {
      return false
    }
  }

  isPasswordsEmpty (passwords: string): boolean {
    if (passwords === '' || passwords === null || passwords === undefined) {
      return true
    } else {
      return false
    }
  }

  isPermissionEmpty (permission: string): boolean {
    if (permission === '' || permission === null || permission === undefined) {
      return true
    } else {
      return false
    }
  }

  async loginAlreadyExists (login: string): Promise<boolean> {
    if ((await this.userRepository.getByLogin(login)) != null) {
      return true
    } else {
      return false
    }
  }

  async emailAlreadyExists (email: string): Promise<boolean> {
    if ((await this.userRepository.getByEmail(email)) != null) {
      return true
    } else {
      return false
    }
  }
}

export default UserValidator
