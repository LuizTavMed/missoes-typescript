import type { Express } from 'express'

interface IApp {
  readonly express: Express
  hasStarted: boolean
}

export default IApp
