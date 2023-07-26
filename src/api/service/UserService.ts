import type IUuidGenerator from '../interface/IUuidGenerator'
import type IDateManager from '../interface/IDateManager'
import type IUserRepository from '../interface/IUserRepository'
import type ICrypto from '../interface/ICrypto'
import type IUserService from '../interface/IUserService'
import type IUser from '../interface/IUser'

class UserService implements IUserService {
  constructor (readonly userRepository: IUserRepository, readonly crypto: ICrypto, readonly uuidGenerator: IUuidGenerator, readonly dateManager: IDateManager) {}

  async create (login: string, password: string, email: string, type: string): Promise<IUser> {
    return await this.userRepository.create(this.uuidGenerator.generate(), login, await this.crypto.getPasswordHash(password), email, type)
  }

  async getAll (): Promise<IUser[] | null> {
    return await this.userRepository.getAll()
  }

  async get (id: string): Promise<IUser | null> {
    return await this.userRepository.get(id)
  }

  async update (id: string, body: IUser): Promise<IUser | null> {
    if (body.password !== undefined) {
      body.password = await this.crypto.getPasswordHash(body.password)
    }
    return await this.userRepository.update(id, body)
  }

  async delete (id: string): Promise<IUser | null> {
    return await this.userRepository.delete(id)
  }
}

export default UserService
