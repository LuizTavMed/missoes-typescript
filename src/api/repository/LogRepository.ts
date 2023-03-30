import getDateNow from '../../helper/getDateNow'

import { type Request } from 'express'

import Log from '../model/Log'

import dataSource from '../../db/dataSource'
const repositorioLog = dataSource.getRepository(Log)

class LogRepository {
  async create (req: Request): Promise<Log> {
    const log = new Log()
    log.date = getDateNow()
    log.message = req.body.message
    await repositorioLog.save(log)
    return log
  }

  async getAll (): Promise<Log[] | null> {
    const listaTodosLogs = await repositorioLog.find()
    return listaTodosLogs
  }

  async get (req: Request): Promise<Log | null> {
    const log = await repositorioLog.findBy({
      id: parseInt(req.params.id)
    })
    return log[0]
  }

  async update (req: Request): Promise<Log[] | Log> {
    const log = await repositorioLog.findBy({
      id: parseInt(req.params.id)
    })
    if (log[0] === undefined) {
      return log[0]
    }
    if (req.body.evento != undefined) {
      log[0].message = req.body.message
    }
    if (req.body.data != undefined) {
      log[0].date = req.body.date
    }
    repositorioLog.save(log[0])
    return log[0]
  }

  async delete (req: Request): Promise<Log | Log> {
    const log = await repositorioLog.findBy({
      id: parseInt(req.params.id)
    })
    if (log[0] === undefined) {
      return log[0]
    } else {
      repositorioLog.remove(log[0])
      return log[0]
    }
  }
}

export default LogRepository
