import getDateNow from '../../helper/getDateNow'

import type { Repository, EntityTarget, ObjectLiteral, DataSource } from 'typeorm'

import type ILog from '../interface/ILog'

import type ILogRepository from '../interface/ILogRepository'

class LogRepository implements ILogRepository {
  readonly resource: Repository<ObjectLiteral>

  constructor (dataSource: DataSource, logEntity: EntityTarget<ObjectLiteral>) {
    this.resource = dataSource.getRepository(logEntity)
  }

  async create (message: string): Promise<ObjectLiteral> {
    const date = getDateNow()
    const log: ILog = { date, message }
    await this.resource.save(log)
    return log
  }

  async getAll (): Promise<ObjectLiteral[] | null> {
    const listaTodosLogs = await this.resource.find()
    return listaTodosLogs
  }

  async get (id: number): Promise<ObjectLiteral | null> {
    const log = await this.resource.findBy({ id })
    return log[0]
  }

  async update (id: number, body: ObjectLiteral): Promise<ObjectLiteral | ObjectLiteral> {
    const log = await this.resource.findBy({ id })
    if (log[0] === undefined) {
      return log[0]
    }
    if (body.message !== undefined) {
      log[0].message = body.message
    }
    if (body.date !== undefined) {
      log[0].date = body.date
    }
    await this.resource.save(log[0])
    return log[0]
  }

  async delete (id: number): Promise<ObjectLiteral | null> {
    const log = await this.resource.findBy({ id })
    if (log[0] === undefined) {
      return log[0]
    } else {
      await this.resource.remove(log[0])
      return log[0]
    }
  }
}

export default LogRepository
