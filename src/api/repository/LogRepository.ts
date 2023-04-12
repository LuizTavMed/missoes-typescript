import getDateNow from '../../helper/getDateNow'

import type { Repository, EntityTarget, ObjectLiteral, DataSource } from 'typeorm'

import { type Request } from 'express'

import Log from '../entity/LogEntity'
import type ILogRepository from '../interface/ILogRepository'

class LogRepository implements ILogRepository {
  readonly resource: Repository<ObjectLiteral>

  constructor (dataSource: DataSource, logEntity: EntityTarget<ObjectLiteral>) {
    this.resource = dataSource.getRepository(logEntity)
  }

  async create (message: string): Promise<Log> {
    const log = new Log(getDateNow(), message)
    await this.resource.save(log)
    return log
  }

  async getAll (): Promise<ObjectLiteral[] | null> {
    const listaTodosLogs = await this.resource.find()
    return listaTodosLogs
  }

  async get (req: Request): Promise<ObjectLiteral | null> {
    const log = await this.resource.findBy({
      id: parseInt(req.params.id)
    })
    return log[0]
  }

  async update (req: Request): Promise<ObjectLiteral | Log> {
    const log = await this.resource.findBy({
      id: parseInt(req.params.id)
    })
    if (log[0] === undefined) {
      return log[0]
    }
    if (req.body.message !== undefined) {
      log[0].message = req.body.message
    }
    if (req.body.data !== undefined) {
      log[0].date = req.body.date
    }
    await this.resource.save(log[0])
    return log[0]
  }

  async delete (req: Request): Promise<ObjectLiteral | null> {
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
