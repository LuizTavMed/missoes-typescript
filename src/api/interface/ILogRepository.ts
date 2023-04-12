import type { Repository, ObjectLiteral } from 'typeorm'
import type { Request } from 'express'

interface LogRepository {
  readonly resource: Repository<ObjectLiteral>

  create: (message: string) => Promise<ObjectLiteral>
  getAll: () => Promise<ObjectLiteral[] | null>
  get: (req: Request) => Promise<ObjectLiteral | null>
  update: (req: Request) => Promise<ObjectLiteral | null>
  delete: (req: Request) => Promise<ObjectLiteral | null>
}

export default LogRepository
