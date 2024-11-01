import express, { type Router } from 'express' // Importação correta
import { cadastraInformacaoPessoa, listaCadastro } from './controller/cadastroInformacao'

const rotas: Router = express.Router() // Criação do Router

rotas.post('/api/pessoas', cadastraInformacaoPessoa)
rotas.get('/api/pessoas', listaCadastro)

export default rotas // Exportação das rotas
