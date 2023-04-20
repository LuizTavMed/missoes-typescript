import 'reflect-metadata'
import { DataSource } from 'typeorm'

import type LogEntity from '../api/entity/LogEntity'
import type UserEntity from '../api/entity/UserEntity'

import type IDatabase from '../api/interface/IDatabase'

class MariadbTest implements IDatabase {
  dataSource: DataSource
  isInitialized: boolean

  constructor (entityList: Array<typeof LogEntity | typeof UserEntity>) {
    this.dataSource = new DataSource({
      type: 'mysql',
      database: 'intranet',
      host: 'localhost',
      username: 'root',
      password: 'mariadb',
      port: 3306,
      synchronize: true,
      logging: false,
      entities: entityList,
      migrations: [],
      subscribers: []
    })
    this.isInitialized = false
  }

  async start (): Promise<void> {
    try {
      await this.dataSource.initialize()
      this.isInitialized = true
    } catch (error) {
      console.error(error)
    }
  }

  async stop (): Promise<void> {
    await this.dataSource.dropDatabase()
    await this.dataSource.destroy()
    this.isInitialized = false
    
  }
}

export default MariadbTest
