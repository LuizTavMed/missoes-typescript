
import type IUserRepository from '../interface/IUserRepository'
import type IUser from '../interface/IUser'
import type IOracledbDataSource from '../interface/IOracledbDataSource'

class UserRepository implements IUserRepository {
  constructor (readonly dataSource: IOracledbDataSource) { this.dataSource = dataSource }
  async create (id: string, login: string, password: string, email: string, type: string): Promise<IUser> {
    await this.dataSource.insertUserRegistry(id, login, password, email, type)
    const user = { id, login, password, email, type }
    return user
  }

  async getAll (): Promise<IUser[]> {
    return await this.dataSource.getEveryUserRegistry()
  }

  async get (id: string): Promise<IUser | null> {
    const userList = await this.dataSource.getUserBy('id', id)
    const user = userList
    if (user == null) {
      return null
    }
    return user
  }

  async getByLogin (login: string): Promise<IUser | null> {
    const userList = await this.dataSource.getUserBy('login', login)
    const user = userList
    return user
  }

  async getByEmail (email: string): Promise<IUser | null> {
    const userList = await this.dataSource.getUserBy('email', email)
    const user = userList
    return user
  }

  async update (id: string, body: IUser): Promise<IUser | null> {
    const userList = await this.dataSource.getUserBy('id', id)
    const user = userList
    if (user == null) {
      return user
    }
    if (body.password !== undefined) {
      user.password = body.password
    }
    if (body.email !== undefined) {
      user.email = body.email
    }
    if (body.type !== undefined) {
      user.type = body.type
    }
    await this.dataSource.updateUserById(id, user.login, user.password, user.email, body.type)
    return user
  }

  async delete (id: string): Promise<IUser | null> {
    const userList = await this.dataSource.getUserBy('id', id)
    const user = userList
    if (user === undefined) {
      return user
    } else {
      await this.dataSource.deleteUserById(id)
      return user
    }
  }
}

export default UserRepository
