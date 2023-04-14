interface IUserValidator {
  isUserValid: (login: string, password: string, permission: string) => boolean
  isLoginEmpty: (login: string) => boolean
  isPasswordsEmpty: (passwords: string) => boolean
  isPermissionEmpty: (permission: string) => boolean
}

export default IUserValidator
