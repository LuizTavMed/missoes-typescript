import { type Request, type Response } from 'express'
import type ILogValidator from './ILogValidator'
import type ILogRepository from './ILogRepository'

interface ILogController {
  readonly logRepository: ILogRepository
  readonly logValidator: ILogValidator

  create: (req: Request, res: Response) => Response
  getAll: (req: Request, res: Response) => Response
  get: (req: Request, res: Response) => Response
  update: (req: Request, res: Response) => Response
  delete: (req: Request, res: Response) => Response
}

export default ILogController
