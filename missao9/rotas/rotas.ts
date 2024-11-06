import * as express from 'express'
import { leituraInformacao, listaPessoasCadastradas, recuperarPessoa, excluirPessoa, atualizarPessoa } from '../controller/leituraInformacao'

const rotas = express.Router()

rotas.post('/api/pessoas', leituraInformacao)

rotas.get('/api/pessoas', listaPessoasCadastradas)

rotas.get('/api/pessoas/:id', recuperarPessoa)

rotas.delete('/api/pessoas/:id', excluirPessoa)

rotas.put('/api/pessoas/:id', atualizarPessoa)

export default rotas
