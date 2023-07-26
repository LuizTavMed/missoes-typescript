import type UserEntity from '../entity/User'
import type IOracledbDataSource from './IOracledbDataSource'
import type IUser from './IUser'

interface IUserRepository {
  readonly dataSource: IOracledbDataSource

  create: (id: string, login: string, password: string, email: string, type: string) => Promise<IUser>
  getAll: () => Promise<IUser[]>
  get: (id: string) => Promise<IUser | null>
  getByLogin: (login: string) => Promise<IUser | null>
  getByEmail: (email: string) => Promise<IUser | null>
  update: (id: string, body: UserEntity) => Promise<IUser | null>
  delete: (id: string) => Promise<IUser | null>
}

export default IUserRepository
