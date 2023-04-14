import { type Request, type Response } from 'express'

import type ILogController from '../interface/ILogController'
import type ILogRepository from '../interface/ILogRepository'
import type ILogValidator from '../interface/ILogValidator'

enum LogError {
  USER_INVALID_REQUEST = 'A requisição inserida foi considerada inválida',
  USER_LIST_ERROR = 'Houve um erro quando tentamos buscar a lista',
  USER_NOT_FOUND = 'Não foi possível encontrar este usuário',
  USER_NOT_UPDATED = 'Não foi possível atualizar este usuário',
  USER_NOT_DELETED = 'Não foi possível deletar este usuário',
}
class LogController implements ILogController {
  constructor (readonly logRepository: ILogRepository, readonly logValidator: ILogValidator) {
    this.logRepository = logRepository
    this.logValidator = logValidator
  }

  async create (req: Request, res: Response): Promise<void> {
    try {
      if (!this.logValidator.messageIsEmpty(req.body.message)) {
        const log = await this.logRepository.create(req.body.message)
        res.status(200).json(log)
      }
    } catch (erro) {
      console.error(erro)
      res.status(400).send(LogError.USER_INVALID_REQUEST)
    }
  }

  async getAll (req: Request, res: Response): Promise<void> {
    try {
      const listaLogs = await this.logRepository.getAll()
      res.status(200).json(listaLogs)
    } catch (erro) {
      console.error(erro)
      res.status(400).send(LogError.USER_INVALID_REQUEST)
    }
  }

  async get (req: Request, res: Response): Promise<void> {
    try {
      const log = await this.logRepository.get(req.params.id)
      if (log != null) {
        res.status(200).json(log)
      } else {
        res.status(404).send(LogError.USER_NOT_FOUND)
      }
    } catch (erro) {
      res.status(400).send(LogError.USER_INVALID_REQUEST)
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      const log = await this.logRepository.update(req)
      if (log !== undefined) {
        res.status(200).json(log)
      } else {
        res.status(404).send(LogError.USER_NOT_UPDATED)
      }
    } catch (erro) {
      console.log(erro)
      res.status(400).send(LogError.USER_INVALID_REQUEST)
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const log = await this.logRepository.delete(req)
      if (log != null) {
        res.status(200).json(log)
      } else {
        res.status(404).send(LogError.USER_NOT_DELETED)
      }
    } catch (erro) {
      console.error(erro)
      res.status(400).send(LogError.USER_INVALID_REQUEST)
    }
  }
}

export default LogController
