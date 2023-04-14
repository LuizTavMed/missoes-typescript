import 'reflect-metadata'
import { DataSource } from 'typeorm'

// importando entidades do banco

import LogEntity from '../api/entity/LogEntity'
import type IDatabase from '../api/interface/IDatabase'

class MariadbTest implements IDatabase {
  dataSource: DataSource
  isInitialized: boolean

  constructor () {
    this.dataSource = new DataSource({
      type: 'mysql',
      database: 'test-database',
      host: 'localhost',
      username: 'root',
      password: 'mariadb',
      port: 3306,
      synchronize: true,
      logging: false,
      entities: [LogEntity],
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
    await this.dataSource.destroy()
  }
}

export default MariadbTest
