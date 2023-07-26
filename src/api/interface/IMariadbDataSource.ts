import type ILog from './ILog'
import type IUser from './IUser'

interface IMariadbDataSource {
  bootstrap: () => Promise<boolean>
  startConnection: () => Promise<boolean>
  stopConnection: () => Promise<boolean>
  openConnectionPool: () => Promise<boolean>
  closeConnectionPool: () => Promise<boolean>
  databaseDatabaseExists: () => Promise<boolean>
  createDatabaseDatabase: () => Promise<boolean>
  useDatabaseDatabase: () => Promise<boolean>
  createLogTable: () => Promise<boolean>
  createUserTable: () => Promise<boolean>
  tableExists: (tableName: string) => Promise<boolean>
  createNecessaryTables: () => Promise<boolean>
  insertLogRegistry: (id: string, date: string, message: string) => Promise<ILog>
  insertUserRegistry: (id: string, loginlogin: string, password: string, email: string, type: string) => Promise<IUser>
  getEveryLogRegistry: () => Promise<ILog[]>
  getEveryUserRegistry: () => Promise<IUser[]>
  getLogBy: (parameter: string, value: string) => Promise<ILog[]>
  getUserBy: (parameter: string, value: string) => Promise<IUser[]>
  updateUserById: (id: string, login: string, password: string, email: string, type: string) => Promise<IUser>
  deleteUserById: (id: string) => Promise<boolean>
}

export default IMariadbDataSource
