interface IUserValidator {
  isLoginEmpty: (login: string) => boolean
  isPasswordsEmpty: (passwords: string) => boolean
  isPermissionEmpty: (permission: string) => boolean
}

export default IUserValidator
