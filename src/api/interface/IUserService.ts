import type IUser from './IUser'

interface IUserService {
  create: (login: string, password: string, email: string, type: string) => Promise<IUser>
  getAll: () => Promise<IUser[] | null>
  get: (id: string) => Promise<IUser | null>
  update: (id: string, body: IUser) => Promise<IUser | null>
  delete: (id: string) => Promise<IUser | null>
}

export default IUserService
