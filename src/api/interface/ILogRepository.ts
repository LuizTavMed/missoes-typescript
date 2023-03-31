import type Log from '../entity/LogEntity'
import { type Request } from 'express'

interface LogRepository {
  create: (req: Request) => Promise<Log>
  getAll: () => Promise<Log[] | null>
  get: (req: Request) => Promise<Log | null>
  update: (req: Request) => Promise<Log[] | Log>
  delete: (req: Request) => Promise<Log | Log>
}

export default LogRepository
