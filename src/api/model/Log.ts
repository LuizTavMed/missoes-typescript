import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
class Log {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    date!: string

  @Column()
    message!: string
}

export default Log
