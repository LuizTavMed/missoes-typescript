import * as express from 'express'
import { cadastroADM } from '../controller/controllerADM/cadastraAdm'
import { loginadm } from '../controller/controllerADM/login'
import { emailValidaTrocarSenha } from '../controller/redefinirDados'
import { cadastraPessoa } from '../controller/controllerFuncoes/controleCadastro'
import { listaCadastros } from '../controller/controllerFuncoes/controllerLista'
import { buscarUsuario } from '../controller/controllerFuncoes/controllerBusca'
import { atualizarCadastro } from '../controller/controllerFuncoes/controllerAtualizacao'
import { excluirCadastro } from '../controller/controllerFuncoes/controllerExcluir'

const rotas = express.Router()

// rotas necessáriamente para o adm
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
rotas.post('/api/trocaSenha', (req, res) => {
  emailValidaTrocarSenha(req, res).catch((error) => {
    console.error(error)
    res.status(500).send({ message: 'Erro interno do servidor' })
  })
})
// rotas dos usuarios cadastrados pelo adm
rotas.post('/api/pessoas', (req, res) => {
  // rotas.use(verificacaoJwt)
  // console.log('passou aq')
  cadastraPessoa(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.get('/api/pessoas', (req, res) => {
  // rotas.use(verificacaoJwt)
  listaCadastros(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.get('/api/pessoas/:id', (req, res) => {
  // rotas.use(verificacaoJwt)
  buscarUsuario(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.put('/api/pessoas/:id', (req, res) => {
  // rotas.use(verificacaoJwt)
  atualizarCadastro(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
rotas.delete('/api/pessoas/:id', (req, res) => {
  // rotas.use(verificacaoJwt)
  excluirCadastro(req, res).catch((error) => {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  })
})
export default rotas
