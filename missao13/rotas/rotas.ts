import * as express from 'express'
import { loginPessoas, verificacaoJwt, cadastraPessoa, listaCadastro, recuperarPessoa, atualizarPessoa, excluirPessoa } from '../controller/controleInformação'

const rotas = express.Router()

rotas.post('/api/login', (req, res) => {
  loginPessoas(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Error interno servidor' })
  })
})

rotas.use(verificacaoJwt)

rotas.post('/api/pessoas', (req, res) => {
  cadastraPessoa(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.get('/api/pessoas', (req, res) => {
  listaCadastro(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.get('/api/pessoas/:id', (req, res) => {
  recuperarPessoa(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
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
