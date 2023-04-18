import 'reflect-metadata'
import { DataSource } from 'typeorm'

import UserEntity from '../api/entity/UserEntity'
import LogEntity from '../api/entity/LogEntity'

import type IDatabase from '../api/interface/IDatabase'

class Mariadb implements IDatabase {
  dataSource: DataSource
  isInitialized: boolean

  constructor () {
    this.dataSource = new DataSource({
      type: 'mysql',
      database: 'intranet',
      host: 'localhost',
      username: 'root',
      password: 'mariadb',
      port: 3306,
      synchronize: true,
      logging: true,
      entities: [LogEntity, UserEntity],
      migrations: [],
      subscribers: []
    })
    this.isInitialized = false
  }

  async start (): Promise<void> {
    try {
      console.log('Banco de dados inicializado')
      await this.dataSource.initialize()
      this.isInitialized = true
    } catch (error) {
      console.error(error)
    }
  }

  async stop (): Promise<void> {
    await this.dataSource.destroy()
  }
}

export default Mariadb
