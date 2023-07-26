import config from '../config'

import * as mariadb from 'mariadb'
import type { Connection, Pool } from 'mariadb'

import type IMariadbDataSource from '../api/interface/IMariadbDataSource'
import type IUser from '../api/interface/IUser'
import type ILog from '../api/interface/ILog'

class MariadbDataSource implements IMariadbDataSource {
  private connection: Connection | undefined
  private pool: Pool | undefined

  async bootstrap (): Promise<boolean> {
    await this.openConnectionPool()
    await this.createNecessaryDatabases()
    await this.useDatabaseDatabase()
    await this.createNecessaryTables()
    return true
  }

  async startConnection (): Promise<boolean> {
    console.log('connection started')
    this.connection = await mariadb.createConnection({ host: config.mariadb.host, user: config.mariadb.username, password: config.mariadb.password })
    return true
  }

  async stopConnection (): Promise<boolean> {
    if (this.connection === undefined) {
      return false
    }
    console.log('connection stopped')
    await this.connection.end()
    return true
  }

  async openConnectionPool (): Promise<boolean> {
    this.pool = mariadb.createPool({ host: config.mariadb.host, user: config.mariadb.username, password: config.mariadb.password })
    return true
  }

  async closeConnectionPool (): Promise<boolean> {
    if (this.pool === undefined) {
      return false
    }
    await this.pool.end()
    return true
  }

  async databaseDatabaseExists (): Promise<boolean> {
    const databaseList = await this.pool?.query("SHOW DATABASES LIKE 'database' ;")
    if (databaseList.length === 0) {
      return false
    }
    return true
  }

  async createDatabaseDatabase (): Promise<boolean> {
    await this.pool?.query('CREATE DATABASE database ;')
    return true
  }

  async useDatabaseDatabase (): Promise<boolean> {
    await this.pool?.query('USE database')
    return true
  }

  async createNecessaryDatabases (): Promise<boolean> {
    if (!await this.databaseDatabaseExists()) {
      await this.createDatabaseDatabase()
    }
    return true
  }

  async createLogTable (): Promise<boolean> {
    console.log('creating log table')
    await this.pool?.query("CREATE TABLE `log` (`id` UUID NOT NULL,`date` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`message` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci')COLLATE='latin1_swedish_ci'ENGINE=InnoDB;")
    return true
  }

  async createUserTable (): Promise<boolean> {
    console.log('creating user table')
    await this.pool?.query("CREATE TABLE `user` (`id` UUID NOT NULL,`login` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`password` VARCHAR(300) NOT NULL COLLATE 'latin1_swedish_ci',`email` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`type` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci')COLLATE='latin1_swedish_ci'ENGINE=InnoDB;")
    return true
  }

  async tableExists (tableName: string): Promise<boolean> {
    const res = await this.pool?.query(`SHOW TABLES FROM database LIKE '${tableName}' ;`)
    if (res[0] == null) {
      return false
    }
    return true
  }

  async createNecessaryTables (): Promise<boolean> {
    if (!await this.tableExists('log')) await this.createLogTable()
    if (!await this.tableExists('user')) await this.createUserTable()
    return true
  }

  async insertLogRegistry (id: string, date: string, message: string): Promise<ILog> {
    await this.pool?.query(`INSERT INTO database.log (id, date, message) VALUES ('${id}', '${date}', '${message}');`)
    return { id, date, message }
  }

  async insertUserRegistry (id: string, login: string, password: string, email: string, type: string): Promise<IUser> {
    await this.pool?.query(`INSERT INTO database.user (id, login, password, email, type) VALUES ('${id}', '${login}', '${password}', '${email}', '${type}');`)
    return { id, login, password, email, type }
  }

  async getEveryLogRegistry (): Promise<ILog[]> {
    const tableContent = await this.pool?.query('SELECT * FROM database.log ;')
    return tableContent
  }

  async getEveryUserRegistry (): Promise<IUser[]> {
    const tableContent = await this.pool?.query('SELECT * FROM database.user ;')
    return tableContent
  }

  async getLogBy (parameter: string, value: string): Promise<ILog[]> {
    const data = await this.pool?.query(`SELECT * FROM database.log WHERE ${parameter} = '${value}'`)
    return data
  }

  async getUserBy (parameter: string, value: string): Promise<IUser[]> {
    const data = await this.pool?.query(`SELECT * FROM database.user WHERE ${parameter} = '${value}';`)
    return data
  }

  async updateUserById (id: string, login: string, password: string, email: string, type: string): Promise<IUser> {
    await this.pool?.query(`UPDATE  database.user SET id = '${id}', login = '${login}', password = '${password}', email = '${email}', type= '${type}' WHERE id = '${id}';`)
    return { id, login, password, email, type }
  }

  async deleteUserById (id: string): Promise<boolean> {
    await this.pool?.query(`DELETE FROM database.user WHERE id = '${id}';`)
    return true
  }
}

export default MariadbDataSource
