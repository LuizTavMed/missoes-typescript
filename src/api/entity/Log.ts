import type ILog from '../interface/ILog'

class Log implements ILog {
  constructor (id: string, date: string, message: string) {
    this.id = id
    this.date = date
    this.message = message
  }

  id!: string
  date!: string
  message!: string
}

export default Log
