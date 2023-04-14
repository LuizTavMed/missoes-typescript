import { type Request, type Response } from 'express'
import type IUserValidator from './IUserValidator'
import type IUserRepository from './IUserRepository'

interface IUserController {
  readonly userRepository: IUserRepository
  readonly userValidator: IUserValidator

  create: (req: Request, res: Response) => Promise<void>
  getAll: (res: Response) => Promise<void>
  get: (req: Request, res: Response) => Promise<void>
  update: (req: Request, res: Response) => Promise<void>
  delete: (req: Request, res: Response) => Promise<void>
}

export default IUserController
