import getDateNow from '../../helper/getDateNow'

import type { Repository, ObjectLiteral, DataSource } from 'typeorm'

import { type Request } from 'express'

import Log from '../entity/LogEntity'
import type ILogRepository from '../interface/ILogRepository'

import type LogEntity from '../entity/LogEntity'

class LogRepository implements ILogRepository {
  readonly resource: Repository<ObjectLiteral>

  constructor (dataSource: DataSource, logEntity: LogEntity) {
    this.resource = dataSource.getRepository(Log)
  }

  async create (req: Request): Promise<Log> {
    const log = new Log(getDateNow(), req.body.message)
    await this.resource.save(log)
    return log
  }

  async getAll (): Promise<Log[] | null> {
    const listaTodosLogs = await this.resource.find()
    return listaTodosLogs
  }

  async get (req: Request): Promise<Log | null> {
    const log = await this.resource.findBy({
      id: parseInt(req.params.id)
    })
    return log[0]
  }

  async update (req: Request): Promise<Log[] | Log> {
    const log = await this.resource.findBy({
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
    await this.resource.save(log[0])
    return log[0]
  }

  async delete (req: Request): Promise<Log | Log> {
    const log = await this.resource.findBy({
      id: parseInt(req.params.id)
    })
    if (log[0] === undefined) {
      return log[0]
    } else {
      await this.resource.remove(log[0])
      return log[0]
    }
  }
}

export default LogRepository
