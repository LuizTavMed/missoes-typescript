import * as express from 'express'
import { loginPessoa, verificacaoJwt, cadastroPessoa, listarPessoas, rescuperarPessoas, atualizarPessoa, excluirPessoa } from '../controller/controleDados'

const rotas = express.Router()

rotas.post('/api/login', (req, res) => {
  loginPessoa(req, res).catch((error) => {
    console.error(error)
    res.status(500).send({ message: 'Erro interno do servidor' })
  })
})

rotas.use(verificacaoJwt)

rotas.post('/api/pessoas', (req, res) => {
  cadastroPessoa(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.get('/api/pessoas', (req, res) => {
  listarPessoas(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Error interno do servidor' })
  })
})
rotas.get('/api/pessoas/:id', (req, res) => {
  rescuperarPessoas(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Error interno do servidor' })
  })
})
rotas.put('/api/pessoas/:id', (req, res) => {
  atualizarPessoa(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.delete('/api/pessoas/:id', (req, res) => {
  excluirPessoa(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
export default rotas
