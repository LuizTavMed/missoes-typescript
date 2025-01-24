import * as express from 'express'
import { listaCadastros, validacaoLogin } from '../controller/login'

const rotas = express.Router()

// rotas.post('/api/login', (req, res) => {
//   validacaoLogin(req, res).catch((error) => {
//     console.error(error)
//     res.status(500).send({ message: 'Erro interno do servidor' })
//   })
// })
rotas.post('/api/login', validacaoLogin)

rotas.get('/api/login', listaCadastros)

export default rotas
