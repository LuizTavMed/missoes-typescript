import getDateNow from '../../helper/getDateNow'

import { type Request } from 'express'

import Log from '../entity/LogEntity'
import type ILogRepository from '../interface/ILogRepository'

import dataSource from '../../data/dataSourceMysql'
const logDataSource = dataSource.getRepository(Log)

class LogRepository implements ILogRepository {
  async create (req: Request): Promise<Log> {
    const log = new Log(getDateNow(), req.body.message)
    await logDataSource.save(log)
    return log
  }

  async getAll (): Promise<Log[] | null> {
    const listaTodosLogs = await logDataSource.find()
    return listaTodosLogs
  }

  async get (req: Request): Promise<Log | null> {
    const log = await logDataSource.findBy({
      id: parseInt(req.params.id)
    })
    return log[0]
  }

  async update (req: Request): Promise<Log[] | Log> {
    const log = await logDataSource.findBy({
      id: parseInt(req.params.id)
    })
    if (log[0] === undefined) {
      return log[0]
    }
    if (req.body.evento !== undefined) {
      log[0].message = req.body.message
    }
    if (req.body.data !== undefined) {
      log[0].date = req.body.date
    }
    await logDataSource.save(log[0])
    return log[0]
  }

  async delete (req: Request): Promise<Log | Log> {
    const log = await logDataSource.findBy({
      id: parseInt(req.params.id)
    })
    if (log[0] === undefined) {
      return log[0]
    } else {
      await logDataSource.remove(log[0])
      return log[0]
    }
  }
}

export default LogRepository
