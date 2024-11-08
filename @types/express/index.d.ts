// @types/express/index.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    id?: string
    nome?: string
    email?: string
  }
}
