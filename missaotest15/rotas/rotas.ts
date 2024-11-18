import * as express from 'express'
import { cadastroADM } from '../controller/cadastraAdm'
import { loginadm } from '../controller/login'

const rotas = express.Router()

// cadastrar adm
rotas.post('/api/adm/cadastro', (req, res) => {
  cadastroADM(req, res).catch((error) => {
    console.error(error)
    res.status(500).send({ message: 'Erro interno do servidor' })
  })
})
rotas.post('/api/login', (req, res) => {
  loginadm(req, res).catch((error) => {
    console.error(error)
    res.status(500).send({ message: 'Erro interno do servidor' })
  })
})
export default rotas
