import type { Express } from 'express'
import type { Server } from 'http'

interface IApp {
  readonly express: Express
  hasStarted: boolean
  server: Server

  start: () => void
  stop: () => void
}

export default IApp
