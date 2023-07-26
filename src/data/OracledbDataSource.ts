import config from '../config'

import type IOracledbDataSource from '../api/interface/IOracledbDataSource'

import * as oracledb from 'oracledb'
import type { Pool, Connection } from 'oracledb'

import type ILogEntity from '../api/interface/ILog'
import type IUserEntity from '../api/interface/IUser'

class OracledbDataSource implements IOracledbDataSource {
  private pool: Pool | undefined
  private connection: Connection | undefined

  async start (): Promise<boolean> {
    await this.startConnection()
    await this.createNecessaryTables()
    return true
  }

  async startConnection (): Promise<boolean> {
    // await oracledb.getConnection({user: config.oracledb.username, password: config.oracledb.password,})
    this.connection = await oracledb.getConnection({ user: config.oracledb.username, password: config.oracledb.password, connectString: config.oracledb.connectString, privilege: oracledb.SYSDBA })
    return true
  }

  async stopConnection (): Promise<boolean> {
    await this.connection?.close()
    return true
  }

  async openConnectionPool (): Promise<boolean> {
    this.pool = await oracledb.createPool({ user: config.oracledb.username, password: config.oracledb.password, connectString: config.oracledb.connectString })
    return true
  }

  async closeConnectionPool (): Promise<boolean> {
    await this.pool?.close()
    return true
  }

  async createUserTable (): Promise<boolean> {
    await this.connection?.execute(`CREATE TABLE DATABASE_USER 
    (
      ID VARCHAR2(60) NOT NULL 
    , LOGIN VARCHAR2(50) NOT NULL 
    , PASSWORD VARCHAR2(60) NOT NULL 
    , EMAIL VARCHAR2(60) NOT NULL 
    , TYPE VARCHAR2(50) NOT NULL 
    , CONSTRAINT DATABASE_USER_PK PRIMARY KEY 
      (
        ID 
      )
      ENABLE 
    )`)
    return true
  }

  async createLogTable (): Promise<boolean> {
    await this.connection?.execute(`CREATE TABLE DATABASE_LOG 
    (
      ID VARCHAR2(60) NOT NULL 
    , DATE_ VARCHAR2(20) NOT NULL 
    , MESSAGE VARCHAR2(150) NOT NULL 
    , CONSTRAINT DATABASE_LOG_PK PRIMARY KEY 
      (
        ID 
      )
      ENABLE 
    )`)
    return true
  }

  async userTableExists (): Promise<boolean> {
    const res = await this.connection?.execute("SELECT table_name FROM user_tables WHERE table_name = 'DATABASE_USER'")
    if (res?.rows?.length as number > 0) return true
    return false
  }

  async logTableExists (): Promise<boolean> {
    const res = await this.connection?.execute("SELECT table_name FROM user_tables WHERE table_name = 'DATABASE_LOG'")
    if (res?.rows?.length as number > 0) return true
    return false
  }

  async createNecessaryTables (): Promise<boolean> {
    if (!await this.userTableExists()) await this.createUserTable()
    if (!await this.logTableExists()) await this.createLogTable()
    return true
  }

  async insertLogRegistry (id: string, date: string, message: string): Promise<ILogEntity> {
    await this.connection?.execute(`INSERT INTO SYS.DATABASE_LOG (ID, DATE_, MESSAGE) VALUES ('${id}', '${date}', '${message}')`, {}, { autoCommit: true })
    return { id, date, message }
  }

  async insertUserRegistry (id: string, login: string, password: string, email: string, type: string): Promise<IUserEntity> {
    await this.connection?.execute(`INSERT INTO SYS.DATABASE_USER (ID, LOGIN, PASSWORD, EMAIL, TYPE) VALUES ('${id}', '${login}', '${password}', '${email}','${type}')`, {}, { autoCommit: true })
    return { id, login, password, email, type }
  }

  async getEveryLogRegistry (): Promise<ILogEntity[]> {
    const tableContent = await this.connection?.execute('SELECT * FROM SYS.DATABASE_LOG') as { rows: string[][] }
    const logList: ILogEntity[] = []
    for (let i = 0; i < tableContent?.rows?.length; i++) {
      logList.push({ id: tableContent?.rows[i][0], message: tableContent?.rows[i][1], date: tableContent?.rows[i][2] })
    }
    return logList
  }

  async getEveryUserRegistry (): Promise<IUserEntity[]> {
    const tableContent = await this.connection?.execute('SELECT * FROM SYS.DATABASE_USER') as { rows: string[][] }
    const userList: IUserEntity[] = []
    for (let i = 0; i < tableContent?.rows?.length; i++) {
      userList.push({ id: tableContent?.rows[i][0], login: tableContent?.rows[i][1], password: tableContent?.rows[i][2], email: tableContent?.rows[i][3], type: tableContent?.rows[i][4] })
    }
    return userList
  }

  async getLogBy (parameter: string, value: string): Promise<ILogEntity | null> {
    const data = await this.connection?.execute(`SELECT * FROM SYS.DATABASE_LOG WHERE ${parameter} = '${value}'`, []) as { rows: string[][] }
    if (data.rows.length === 0) return null
    return { id: data.rows[0][0], message: data.rows[0][1], date: data.rows[0][2] }
  }

  async getUserBy (parameter: string, value: string): Promise<IUserEntity | null> {
    const data = await this.connection?.execute(`SELECT * FROM SYS.DATABASE_USER WHERE ${parameter} = '${value}'`, []) as { rows: string[][] }
    if (data.rows.length === 0) return null
    return { id: data.rows[0][0], login: data.rows[0][1], password: data.rows[0][2], email: data.rows[0][3], type: data.rows[0][4] }
  }

  async updateUserById (id: string, login: string, password: string, email: string, type: string): Promise<IUserEntity> {
    await this.connection?.execute(`UPDATE  SYS.DATABASE_USER SET ID = '${id}', LOGIN = '${login}', PASSWORD = '${password}', EMAIL = '${email}', TYPE= '${type}' WHERE ID = '${id}'`, {}, { autoCommit: true })
    return { id, login, password, email, type }
  }

  async deleteUserById (id: string): Promise<boolean> {
    await this.connection?.execute(`DELETE FROM SYS.DATABASE_USER WHERE ID = '${id}'`, {}, { autoCommit: true })
    return true
  }
}

export default OracledbDataSource
