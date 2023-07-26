import { type Request, type Response } from 'express'
import type IFileValidator from './IFileValidator'
interface IFileController {
  readonly fileValidator: IFileValidator

  create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  getAll: (res: Response) => Promise<Response<any, Record<string, any>>>
  download: (req: Request, res: Response) => Promise<void>
  delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}

export default IFileController
