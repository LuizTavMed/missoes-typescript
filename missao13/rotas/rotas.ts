import * as express from 'express'
import { loginPessoas, verificacaoJwt, cadastraPessoa, listaCadastro, recuperarPessoa, atualizarPessoa, excluirPessoa } from '../controller/controleInformação'

const rotas = express.Router()

rotas.post('api/login', (req, res) => loginPessoas)

rotas.use(verificacaoJwt)

rotas.post('api/pessoas', (req, res) => cadastraPessoa)

rotas.get('api/pessoas', (req, res) => listaCadastro)

rotas.get('api/pessoas', (req, res) => recuperarPessoa)

rotas.put('api/pessoas', (req, res) => atualizarPessoa)

rotas.delete('api/pessoas', (req, res) => excluirPessoa)

export default rotas
