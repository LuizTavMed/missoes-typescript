import * as express from 'express'
import { atualizarPessoa, cadastraPessoa, excluirPessoa, listaCadastro, loginPessoas, recuperarPessoa, verificacaoJwt } from '../controller/controleInformação'

const rotas = express.Router()

rotas.post('/api/login', (req, res) => {
  loginPessoas(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})

rotas.use(verificacaoJwt)

rotas.post('/api/pessoas', cadastraPessoa)
rotas.get('/api/pessoas', listaCadastro)
rotas.get('/api/pessoas/:id', recuperarPessoa)
rotas.put('/api/pessoas/:id', atualizarPessoa)
rotas.delete('/api/pessoas/:id', excluirPessoa)

export default rotas
