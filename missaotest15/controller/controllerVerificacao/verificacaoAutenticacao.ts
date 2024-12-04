import { type Request, type Response, type NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
// import banco from '../../bancoDados/bancos'

// criar a funcionalidade de verificação
export const verificacaojwt = (req: Request, res: Response, next: NextFunction): void => {
  const tokenJWT = req.headers.authorization
  if (tokenJWT === undefined || tokenJWT === null || tokenJWT.length === 0) {
    res.status(401).send('Token não fornecido')
    return
  }
  jwt.verify(tokenJWT, 'chaveSecreta', (decoded: any) => {
    if (Error != null) {
      res.status(403).send('Token inválido')
      return
    }
    req.id = decoded.id
    req.email = decoded.email
    req.nome = decoded.nome
    next()
  })
}
