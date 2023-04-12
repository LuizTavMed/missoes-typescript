import 'reflect-metadata'
import { DataSource } from 'typeorm'

// importando entidades do banco

import Log from '../api/entity/LogEntity'
import type IDatabase from '../api/interface/IDatabase'

class Mariadb implements IDatabase {
  dataSource: DataSource

  constructor () {
    this.dataSource = new DataSource({
      type: 'mysql',
      database: 'police-station',
      host: 'localhost',
      username: 'root',
      password: 'mariadb',
      port: 3306,
      synchronize: true,
      logging: true,
      entities: [Log],
      migrations: [],
      subscribers: []
    })
  }

  async start (): Promise<boolean> {
    try {
      await this.dataSource.initialize()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default Mariadb
