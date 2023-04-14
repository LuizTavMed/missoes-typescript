import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import type ILog from '../interface/ILog'

@Entity()
class LogEntity implements ILog {
  constructor (date: string, message: string) {
    this.date = date
    this.message = message
  }

  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    date!: string

  @Column()
    message!: string
}

export default LogEntity
