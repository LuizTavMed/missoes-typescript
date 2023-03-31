import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
class LogEntity {
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
