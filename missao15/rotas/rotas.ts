import * as express from 'express'
import { cadastroADM } from '../controller/controllerADM/cadastraAdm'
import { loginadm } from '../controller/controllerADM/login'
import { emailValidaTrocarSenha } from '../controller/confirmacaoEmailValidacao'
import { cadastraPessoa } from '../controller/controllerFuncoes/controleCadastro'
import { listaCadastros } from '../controller/controllerFuncoes/controllerLista'
import { buscarUsuario } from '../controller/controllerFuncoes/controllerBusca'
import { atualizarCadastro } from '../controller/controllerFuncoes/controllerAtualizacao'
import { excluirCadastro } from '../controller/controllerFuncoes/controllerExcluir'
import { verificacaojwt } from '../controller/controllerVerificacao/verificacaoAutenticacao'
import { trocaDaSenha } from '../controller/trocaSenha'

const rotas = express.Router()

// rotas exclusivas para o adm
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
rotas.post('/api/validacaoTrocaSenha', (req, res) => {
  emailValidaTrocarSenha(req, res).catch((error) => {
    console.error(error)
    res.status(500).send({ message: 'Erro interno do servidor' })
  })
})
rotas.put('/api/trocaSenha/:id', (req, res) => {
  trocaDaSenha(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
}) // troca de senha após reconhecimento do código - PUT ou POST?
// rotas dos usuarios cadastrados pelo adm
rotas.use(verificacaojwt)
rotas.post('/api/pessoas', (req, res) => {
  rotas.use(verificacaojwt)
  // console.log('passou aq')
  cadastraPessoa(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.get('/api/pessoas', (req, res) => {
  rotas.use(verificacaojwt)
  listaCadastros(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.get('/api/pessoas/:id', (req, res) => {
  rotas.use(verificacaojwt)
  buscarUsuario(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.put('/api/pessoas/:id', (req, res) => {
  rotas.use(verificacaojwt)
  atualizarCadastro(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.delete('/api/pessoas/:id', (req, res) => {
  rotas.use(verificacaojwt)
  excluirCadastro(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
export default rotas
