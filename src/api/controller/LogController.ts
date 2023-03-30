import { type Request, type Response } from 'express'

import LogValidator from '../validator/logValidator'

import LogService from '../service/LogService'
const logValidator = new LogValidator()
const logService = new LogService()

enum LogError {
  USER_INVALID_REQUEST = 'A requisição inserida foi considerada inválida',
  USER_LIST_ERROR = 'Houve um erro quando tentamos buscar a lista',
  USER_NOT_FOUND = 'Não foi possível encontrar este usuário',
  USER_NOT_UPDATED = 'Não foi possível atualizar este usuário',
  USER_NOT_DELETED = 'Não foi possível deletar este usuário',
}
class LogController {
  async create (req: Request, res: Response) {
    try {
      const log = await logService.create(req)
      res.status(200).json(log)
    } catch (erro) {
      console.error(erro)
      res.status(400).send(LogError.USER_INVALID_REQUEST)
    }
  }

  async getAll (req: Request, res: Response) {
    try {
      const listaLogs = await logService.getAll()
      res.status(200).json(listaLogs)
    } catch (erro) {
      console.error(erro)
      res.status(400).send(LogError.USER_INVALID_REQUEST)
    }
  }

  async get (req: Request, res: Response) {
    try {
      const log = await logService.get(req)
      if (log != null) {
        res.status(200).json(log)
      } else {
        res.status(404).send(LogError.USER_NOT_FOUND)
      }
    } catch (erro) {
      res.status(400).send(LogError.USER_INVALID_REQUEST)
    }
  }

  async update (req: Request, res: Response) {
    try {
      const log = await logService.update(req)
      if (log != undefined) {
        res.status(200).json(log)
      } else {
        res.status(404).send(LogError.USER_NOT_UPDATED)
      }
    } catch (erro) {
      console.log(erro)
      res.status(400).send(LogError.USER_INVALID_REQUEST)
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const log = await logService.delete(req)
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
