import type ILog from './ILog'

interface ILogService {
  create: (message: string) => Promise<ILog>
  getAll: () => Promise<ILog[]>
  get: (id: string) => Promise<ILog | null>
}

export default ILogService
