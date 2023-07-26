import type ILog from './ILog'
import type IUser from './IUser'

interface IOracledbDataSource {
  start: () => Promise<boolean>
  startConnection: () => Promise<boolean>
  stopConnection: () => Promise<boolean>
  openConnectionPool: () => Promise<boolean>
  closeConnectionPool: () => Promise<boolean>
  createUserTable: () => Promise<boolean>
  createLogTable: () => Promise<boolean>
  logTableExists: () => Promise<boolean>
  createNecessaryTables: () => Promise<boolean>
  insertLogRegistry: (id: string, date: string, message: string) => Promise<ILog>
  insertUserRegistry: (id: string, login: string, password: string, email: string, type: string) => Promise<IUser>
  getEveryLogRegistry: () => Promise<ILog[]>
  getEveryUserRegistry: () => Promise<IUser[]>
  getLogBy: (parameter: string, value: string) => Promise<ILog | null>
  getUserBy: (parameter: string, value: string) => Promise<IUser | null>
  updateUserById: (id: string, login: string, password: string, email: string, type: string) => Promise<IUser>
  deleteUserById: (id: string) => Promise<boolean>
}

export default IOracledbDataSource
