import * as express from 'express'
import { listaCadastros, validacaoLogin } from '../controller/login'

const rotas = express.Router()

rotas.post('/api/login', () => validacaoLogin)

rotas.get('/api/login', listaCadastros)

export default rotas
