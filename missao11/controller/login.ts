import { type Request, type Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { Banco } from '../Banco'
import { Pessoa } from '../Pessoa'

const banco = new Banco()

export const validacaoLogin = (req: Request, res: Response): void => {
  try {
    console.log(req.body)
    const email: string = req.body.login
    const senha: number = parseInt(req.body.senha)
    console.log('Senha convertida: ', senha)
    const id: string = uuidv4()
    const nome: string = 'Luiz Fernando Tavares de Medeiros'

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (email === undefined || email === '') {
      res.status(400).json({
        message: 'Email inválido',
        'invalid-params': [{ field: 'login', reason: 'você deve indicar um email correto' }]
      })
      return
    }

    if (!email.includes('@')) {
      res.status(400).json({
        message: 'Email inválido',
        detail: 'Email deve conter o caractere @',
        'invalid-params': [{ field: 'login', reason: 'você deve indicar um email correto' }]
      })
      return
    }

    if (isNaN(senha)) {
      res.status(400).json({
        message: 'Senha inválida',
        detail: 'Você deve informar um número válido para a senha'
      })
      return
    }

    if (email !== 'luiz@luiz.com' || senha !== 12345) {
      res.status(401).json({ message: 'Login ou senha inválidos' })
      return
    }

    // if (typeof email !== 'string' || typeof senha !== 'number') {
    //   res.status(400).json({
    //     message: 'Dados inválidos para autenticação',
    //     detail: 'Você deve informar o email e a senha'
    //   })
    // }

    // if (!email.includes('@')) {
    //   res.status(400).json({
    //     message: 'Email inválido',
    //     detail: 'Email deve conter o caractere @',
    //     'invalid-params': [{ field: 'login', reason: 'você deve indicar um email correto' }]
    //   })
    // }

    // if (email !== 'luiz@luiz.com' || senha !== 12345) {
    //   res.status(401).json({ message: 'Login ou senha inválidos' })
    //   return
    // }
    // payload, chave secreta, periodo
    // console.log('passou aq')
    // console.log('jwt: ', jwt)
    const token = jwt.sign({ id, nome, email }, 'minhaChaveSecreta', { expiresIn: '10m' })
    const pessoa = new Pessoa(id, nome, email, token)
    banco.listaPessoas.push(pessoa)
    res.status(200).json({ message: 'Login efetuado com sucesso', token })
    console.log(token)
  } catch (erro: any) {
    console.log(erro)
    res.status(500).json({
      message: 'Erro interno no servidor',
      detail: erro
    })
  }
}

export const listaCadastros = (req: Request, res: Response): void => {
  if (banco.listaPessoas.length === 0) {
    res.status(200).json({ listaCadastro: banco.listaPessoas })
    return
  }
  res.json(banco.listaPessoas)
}
