import type { DataSource } from 'typeorm'

interface IDatabase {
  readonly dataSource: DataSource
}

export default IDatabase
