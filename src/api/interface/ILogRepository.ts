import type { Repository, ObjectLiteral } from 'typeorm'

interface LogRepository {
  readonly resource: Repository<ObjectLiteral>

  create: (message: string) => Promise<ObjectLiteral>
  getAll: () => Promise<ObjectLiteral[] | null>
  get: (id: number) => Promise<ObjectLiteral | null>
  update: (id: number, body: ObjectLiteral) => Promise<ObjectLiteral | null>
  delete: (id: number) => Promise<ObjectLiteral | null>
}

export default LogRepository
