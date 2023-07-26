import { type Request, type Response } from 'express'

import type IAuthController from '../interface/IAuthController'
import type IAuthService from '../interface/IAuthService'
import type IUserRepository from '../interface/IUserRepository'
import type ICrypto from '../interface/ICrypto'
import type ITokenManager from '../interface/ITokenManager'

enum AuthErrorMessage {
  UNKNOWN_ERROR = 'Unknown error during request',
  INVALID_AUTHENTICATION = 'Incorrect login or password',
}

class AuthController implements IAuthController {
  constructor (readonly authService: IAuthService, readonly userRepository: IUserRepository, readonly crypto: ICrypto, readonly tokenManager: ITokenManager) {}

  async authenticate (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const authentication = await this.authService.authenticate(req.body.login, req.body.password)
      if (authentication != null) {
        return res.status(200).send(authentication)
      }
      return res.status(400).send(AuthErrorMessage.INVALID_AUTHENTICATION)
    } catch (erro) {
      console.error(erro)
      return res.status(500).send(AuthErrorMessage.UNKNOWN_ERROR)
    }
  }

  async validate (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    if (req.headers.authorization !== undefined && this.authService.validate(req.headers.authorization)) {
      return res.status(200).send('Token is valid')
    } else {
      return res.status(400).send('Invalid token')
    }
  }
}

export default AuthController
