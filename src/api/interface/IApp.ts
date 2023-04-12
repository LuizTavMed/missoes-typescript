import type { Express } from 'express'

interface IApp {
  readonly express: Express
  hasStarted: boolean

  start: () => void
}

export default IApp
