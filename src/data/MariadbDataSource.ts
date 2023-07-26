import config from '../config'

import * as mariadb from 'mariadb'
import type { Connection, Pool } from 'mariadb'

import type IMariadbDataSource from '../api/interface/IMariadbDataSource'
import type ILogEntity from '../api/interface/ILogEntity'

class MariadbDataSource implements IMariadbDataSource {
  private connection: Connection | undefined
  private pool: Pool | undefined

  constructor () {}

  async bootstrap (): Promise<boolean> {
    await this.openConnectionPool()
    await this.createNecessaryDatabases()
    await this.useIntranetDatabase()
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

  async intranetDatabaseExists (): Promise<boolean> {
    const databaseList = await this.pool?.query("SHOW DATABASES LIKE 'intranet' ;")
    if (databaseList.length === 0) {
      return false
    }
    return true
  }

  async createIntranetDatabase (): Promise<boolean> {
    await this.pool?.query('CREATE DATABASE intranet ;')
    return true
  }

  async useIntranetDatabase (): Promise<boolean> {
    await this.pool?.query('USE intranet')
    return true
  }

  async createNecessaryDatabases (): Promise<boolean> {
    if (!await this.intranetDatabaseExists()) {
      await this.createIntranetDatabase()
    }
    return true
  }

  async createFileTable (): Promise<boolean> {
    console.log('creating file table')
    await this.pool?.query("CREATE TABLE `file` (`id` UUID NOT NULL,`name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`title` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`description` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`type` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`date` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`base64` TEXT NOT NULL COLLATE 'latin1_swedish_ci')COLLATE='latin1_swedish_ci'ENGINE=InnoDB;")
    return true
  }

  async createLogTable (): Promise<boolean> {
    console.log('creating log table')
    await this.pool?.query("CREATE TABLE `log` (`id` UUID NOT NULL,`date` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`message` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci')COLLATE='latin1_swedish_ci'ENGINE=InnoDB;")
    return true
  }

  async createUserTable (): Promise<boolean> {
    console.log('creating file table')
    await this.pool?.query("CREATE TABLE `user` (`id` UUID NOT NULL,`login` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`password` VARCHAR(300) NOT NULL COLLATE 'latin1_swedish_ci',`email` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',`type` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci')COLLATE='latin1_swedish_ci'ENGINE=InnoDB;")
    return true
  }

  async tableExists (tableName: string): Promise<boolean> {
    const res = await this.pool?.query(`SHOW TABLES FROM intranet LIKE '${tableName}' ;`)
    if (res[0] == null) {
      return false
    }
    return true
  }

  async createNecessaryTables (): Promise<boolean> {
    if (!await this.tableExists('file')) await this.createFileTable()
    if (!await this.tableExists('log')) await this.createLogTable()
    if (!await this.tableExists('user')) await this.createUserTable()
    return true
  }

  async insertFileRegistry (id: string, name: string, title: string, description: string, type: string, date: string, path: string): Promise<IFileEntity> {
    await this.pool?.query(`INSERT INTO intranet.file (id, name, title, description, type, date, base64) VALUES ('${id}', '${name}', '${title}', '${description}', '${type}', '${date}', '${path}');`)
    return { id, name, title, description, type, date, path }
  }

  async insertLogRegistry (id: string, date: string, message: string): Promise<ILogEntity> {
    await this.pool?.query(`INSERT INTO intranet.log (id, date, message) VALUES ('${id}', '${date}', '${message}');`)
    return { id, date, message }
  }

  async insertUserRegistry (id: string, login: string, password: string, email: string, type: string): Promise<IUserEntity> {
    await this.pool?.query(`INSERT INTO intranet.user (id, login, password, email, type) VALUES ('${id}', '${login}', '${password}', '${email}', '${type}');`)
    return { id, login, password, email, type }
  }

  async getEveryFileRegistry (): Promise<IFileEntity[]> {
    const tableContent = await this.pool?.query('SELECT * FROM intranet.file ;')
    return tableContent
  }

  async getEveryLogRegistry (): Promise<ILogEntity[]> {
    const tableContent = await this.pool?.query('SELECT * FROM intranet.log ;')
    return tableContent
  }

  async getEveryUserRegistry (): Promise<IUserEntity[]> {
    const tableContent = await this.pool?.query('SELECT * FROM intranet.user ;')
    return tableContent
  }

  async getFileBy (parameter: string, value: string): Promise<IFileEntity[]> {
    const data = await this.pool?.query(`SELECT * FROM intranet.file WHERE ${parameter} = '${value}'`)
    return data
  }

  async getLogBy (parameter: string, value: string): Promise<ILogEntity[]> {
    const data = await this.pool?.query(`SELECT * FROM intranet.log WHERE ${parameter} = '${value}'`)
    return data
  }

  async getUserBy (parameter: string, value: string): Promise<IUserEntity[]> {
    const data = await this.pool?.query(`SELECT * FROM intranet.user WHERE ${parameter} = '${value}';`)
    return data
  }

  async updateUserById (id: string, login: string, password: string, email: string, type: string): Promise<IUserEntity> {
    await this.pool?.query(`UPDATE  intranet.user SET id = '${id}', login = '${login}', password = '${password}', email = '${email}', type= '${type}' WHERE id = '${id}';`)
    return { id, login, password, email, type }
  }

  async deleteFileById (id: string): Promise<boolean> {
    await this.pool?.query(`DELETE FROM intranet.file WHERE id = '${id}';`)
    return true
  }

  async deleteUserById (id: string): Promise<boolean> {
    await this.pool?.query(`DELETE FROM intranet.user WHERE id = '${id}';`)
    return true
  }
}

export default MariadbDataSource
