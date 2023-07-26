import { type Request, type Response } from 'express'

import type ILogController from '../interface/ILogController'
import type ILogService from '../interface/ILogService'
import type ILogValidator from '../interface/ILogValidator'

enum LogErrorMessage {
  UNKNOWN = 'Unknown error during request',
  NOT_FOUND = 'The log could not be found',
}

class LogController implements ILogController {
  constructor (readonly logService: ILogService, readonly logValidator: ILogValidator) {}

  async create (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      this.logValidator.validate(req.body.message)
      const log = await this.logService.create(req.body.message)
      return res.status(200).json(log)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message)
      }
      return res.status(500).send(LogErrorMessage.UNKNOWN)
    }
  }

  async getAll (res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const logList = await this.logService.getAll()
      return res.status(200).json(logList)
    } catch (error) {
      return res.status(500).send(LogErrorMessage.UNKNOWN)
    }
  }

  async get (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const log = await this.logService.get(req.params.id)
      if (log != null) {
        return res.status(200).json(log)
      } else {
        return res.status(404).send(LogErrorMessage.NOT_FOUND)
      }
    } catch (error) {
      return res.status(500).send(LogErrorMessage.UNKNOWN)
    }
  }
}

export default LogController
