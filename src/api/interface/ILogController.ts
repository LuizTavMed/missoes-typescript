import { type Request, type Response } from 'express'
import type ILogValidator from './ILogValidator'
import type ILogRepository from './ILogRepository'

interface ILogController {
  readonly logRepository: ILogRepository
  readonly logValidator: ILogValidator

  create: (req: Request, res: Response) => Promise<void>
  getAll: (req: Request, res: Response) => Promise<void>
  get: (req: Request, res: Response) => Promise<void>
  update: (req: Request, res: Response) => Promise<void>
  delete: (req: Request, res: Response) => Promise<void>
}

export default ILogController
