import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import type IUser from '../interface/IUser'

@Entity()
class LogEntity implements IUser {
  constructor (login: string, password: string, permission: string) {
    this.login = login
    this.password = password
    this.permission = permission
  }

  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    login!: string

  @Column()
    password!: string

  @Column()
    permission!: string
}

export default LogEntity
