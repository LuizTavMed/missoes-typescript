import config from '../config'

import type IOracledbDataSource from '../api/interface/IOracledbDataSource'

import * as oracledb from 'oracledb'
import type { Pool, Connection } from 'oracledb'

import type ILog from '../api/interface/ILog'
import type IUser from '../api/interface/IUser'

class OracledbDataSourceTest implements IOracledbDataSource {
  private pool: Pool | undefined
  private connection: Connection | undefined

  async start (): Promise<boolean> {
    await this.startConnection()
    await this.createNecessaryTables()
    return true
  }

  async stop (): Promise<boolean> {
    await this.deleteEveryTable()
    await this.stopConnection()
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
    await this.connection?.execute(`CREATE TABLE DATABASE_TEST_USER 
    (
      ID VARCHAR2(60) NOT NULL 
    , LOGIN VARCHAR2(50) NOT NULL 
    , PASSWORD VARCHAR2(60) NOT NULL 
    , EMAIL VARCHAR2(60) NOT NULL 
    , TYPE VARCHAR2(50) NOT NULL 
    , CONSTRAINT DATABASE_TEST_USER_PK PRIMARY KEY 
      (
        ID 
      )
      ENABLE 
    )`)
    return true
  }

  async createLogTable (): Promise<boolean> {
    await this.connection?.execute(`CREATE TABLE DATABASE_TEST_LOG 
    (
      ID VARCHAR2(60) NOT NULL 
    , DATE_ VARCHAR2(20) NOT NULL 
    , MESSAGE VARCHAR2(150) NOT NULL 
    , CONSTRAINT DATABASE_TEST_LOG_PK PRIMARY KEY 
      (
        ID 
      )
      ENABLE 
    )`)
    return true
  }

  async createFileTable (): Promise<boolean> {
    await this.connection?.execute(`CREATE TABLE DATABASE_TEST_FILE 
(
  ID VARCHAR2(60) NOT NULL 
, NAME VARCHAR2(100) NOT NULL 
, TITLE VARCHAR2(100) NOT NULL 
, DATE_ VARCHAR2(10) NOT NULL 
, DESCRIPTION VARCHAR2(150) NOT NULL  
, TYPE VARCHAR2(60) NOT NULL 
, PATH VARCHAR2(120) NOT NULL 
, CONSTRAINT DATABASE_TEST_FILE_PK PRIMARY KEY 
  (
    ID 
  )
  ENABLE 
)`)
    return true
  }

  async deleteUserTable (): Promise<boolean> {
    await this.connection?.execute('DROP TABLE DATABASE_TEST_USER ', {}, { autoCommit: true })
    return true
  }

  async deleteLogTable (): Promise<boolean> {
    await this.connection?.execute('DROP TABLE DATABASE_TEST_LOG ', {}, { autoCommit: true })
    return true
  }

  async deleteFileTable (): Promise<boolean> {
    await this.connection?.execute('DROP TABLE DATABASE_TEST_FILE ', {}, { autoCommit: true })
    return true
  }

  async deleteEveryTable (): Promise<boolean> {
    if (await this.userTableExists()) await this.deleteUserTable()
    if (await this.logTableExists()) await this.deleteLogTable()
    if (await this.fileTableExists()) await this.deleteFileTable()
    return true
  }

  async userTableExists (): Promise<boolean> {
    const res = await this.connection?.execute("SELECT table_name FROM user_tables WHERE table_name = 'DATABASE_TEST_USER'")
    if (res?.rows?.length as number > 0) return true
    return false
  }

  async logTableExists (): Promise<boolean> {
    const res = await this.connection?.execute("SELECT table_name FROM user_tables WHERE table_name = 'DATABASE_TEST_LOG'")
    if (res?.rows?.length as number > 0) return true
    return false
  }

  async fileTableExists (): Promise<boolean> {
    const res = await this.connection?.execute("SELECT table_name FROM user_tables WHERE table_name = 'DATABASE_TEST_FILE'")
    if (res?.rows?.length as number > 0) return true
    return false
  }

  async createNecessaryTables (): Promise<boolean> {
    if (!await this.userTableExists()) await this.createUserTable()
    if (!await this.logTableExists()) await this.createLogTable()
    if (!await this.fileTableExists()) await this.createFileTable()
    return true
  }

  async insertFileRegistry (id: string, name: string, title: string, date: string, description: string, type: string, path: string): Promise<File> {
    await this.connection?.execute(`INSERT INTO SYS.DATABASE_TEST_FILE (ID, NAME, TITLE, DATE_, DESCRIPTION, TYPE, PATH) VALUES ('${id}', '${name}', '${title}', '${date}', '${description}', '${type}', '${path}')`, {}, { autoCommit: true })
    return { id, name, title, date, description, type, path }
  }

  async insertLogRegistry (id: string, date: string, message: string): Promise<ILog> {
    await this.connection?.execute(`INSERT INTO SYS.DATABASE_TEST_LOG (ID, DATE_, MESSAGE) VALUES ('${id}', '${date}', '${message}')`, {}, { autoCommit: true })
    return { id, date, message }
  }

  async insertUserRegistry (id: string, login: string, password: string, email: string, type: string): Promise<IUser> {
    await this.connection?.execute(`INSERT INTO SYS.DATABASE_TEST_USER (ID, LOGIN, PASSWORD, EMAIL, TYPE) VALUES ('${id}', '${login}', '${password}', '${email}','${type}')`, {}, { autoCommit: true })
    return { id, login, password, email, type }
  }

  async getEveryFileRegistry (): Promise<File[]> {
    const tableContent = await this.connection?.execute('SELECT * FROM SYS.DATABASE_TEST_FILE') as { rows: string[][] }
    const fileList: File[] = []
    for (let i = 0; i < tableContent.rows?.length; i++) {
      fileList.push({ id: tableContent?.rows[i][0], name: tableContent?.rows[i][1], title: tableContent?.rows[i][2], date: tableContent?.rows[i][3], description: tableContent?.rows[i][4], type: tableContent?.rows[i][5], path: tableContent?.rows[i][6] })
    }
    return fileList
  }

  async getEveryLogRegistry (): Promise<ILog[]> {
    const tableContent = await this.connection?.execute('SELECT * FROM SYS.DATABASE_TEST_LOG') as {rows: string[][] }
    const logList: ILog[] = []
    for (let i = 0; i < tableContent?.rows?.length; i++) {
      logList.push({ id: tableContent?.rows[i][0], message: tableContent?.rows[i][1], date: tableContent?.rows[i][2] })
    }
    return logList
  }

  async getEveryUserRegistry (): Promise<IUser[]> {
    const tableContent = await this.connection?.execute('SELECT * FROM SYS.DATABASE_TEST_USER') as { rows: string[][] }
    const userList: IUser[] = []
    for (let i = 0; i < tableContent?.rows?.length; i++) {
      userList.push({ id: tableContent?.rows[i][0], login: tableContent?.rows[i][1], password: tableContent?.rows[i][2], email: tableContent?.rows[i][3], type: tableContent?.rows[i][4] })
    }
    return userList
  }

  async getFileBy (parameter: string, value: string): Promise<IFile | null> {
    const data = await this.connection?.execute(`SELECT * FROM SYS.DATABASE_TEST_FILE WHERE ${parameter} = '${value}'`, []) as { rows: string[][] }
    if (data.rows.length === 0) return null
    return { id: data?.rows[0][0], name: data?.rows[0][1], title: data?.rows[0][2], date: data?.rows[0][3], description: data?.rows[0][4], type: data?.rows[0][5], path: data?.rows[0][6] }
  }

  async getLogBy (parameter: string, value: string): Promise<ILog | null> {
    const data = await this.connection?.execute(`SELECT * FROM SYS.DATABASE_TEST_LOG WHERE ${parameter} = '${value}'`, []) as { rows: string[][] }
    if (data.rows.length === 0) return null
    return { id: data.rows[0][0], message: data.rows[0][1], date: data.rows[0][2] }
  }

  async getUserBy (parameter: string, value: string): Promise<IUser | null> {
    const data = await this.connection?.execute(`SELECT * FROM SYS.DATABASE_TEST_USER WHERE ${parameter} = '${value}'`, []) as { rows: string[][] }
    if (data.rows.length === 0) return null
    return { id: data.rows[0][0], login: data.rows[0][1], password: data.rows[0][2], email: data.rows[0][3], type: data.rows[0][4] }
  }

  async updateUserById (id: string, login: string, password: string, email: string, type: string): Promise<IUser> {
    await this.connection?.execute(`UPDATE  SYS.DATABASE_TEST_USER SET ID = '${id}', LOGIN = '${login}', PASSWORD = '${password}', EMAIL = '${email}', TYPE= '${type}' WHERE ID = '${id}'`, {}, { autoCommit: true })
    return { id, login, password, email, type }
  }

  async deleteFileById (id: string): Promise<boolean> {
    await this.connection?.execute(`DELETE FROM SYS.DATABASE_TEST_FILE WHERE ID = '${id}'`, {}, { autoCommit: true })
    return true
  }

  async deleteUserById (id: string): Promise<boolean> {
    await this.connection?.execute(`DELETE FROM SYS.DATABASE_TEST_USER WHERE ID = '${id}'`, {}, { autoCommit: true })
    return true
  }
}

export default OracledbDataSourceTest
