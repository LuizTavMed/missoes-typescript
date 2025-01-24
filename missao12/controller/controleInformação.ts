import { type Request, type Response, type NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { Pessoa } from '../modelo/Pessoa'
import { Banco } from '../banco/Banco'
// import { type JwtPayload } from 'jsonwebtoken'

const banco: Banco = new Banco()

export const verificacaoJwt = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization
  if (token === undefined || token === null || token.length === 0) {
    res.status(401).send('Token não fornecido')
    return
  }
  jwt.verify(token, 'chaveSecreta', (error, decoded: any) => {
    if (error != null) {
      res.status(403).send('Token inválido')
    }
    req.id = decoded.id
    req.email = decoded.email
    req.nome = decoded.nome

    // const payload = decoded as JwtPayload
    // req.id = payload.id
    // req.nome = payload.nome
    // req.email = payload.email
    next()
  })
}

export const loginPessoas = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.login
  const senha: number = parseInt(req.body.senha)
  const id: string = uuidv4()
  const nome: string = 'Luiz Fernando Tavares de Medeiros'
  try {
    if (email !== 'luiz@gmail.com' || senha !== 12345) {
      console.log(' email: ', email)
      console.log(' senha: ', senha)
      res.status(401).json({ mensagem: 'Credenciais inválidas' })
    } else if (!email.includes('@')) {
      res.status(400).json({
        mensagem: 'Email inválido',
        detalhes: 'Email deve conter o caractere @',
        'invalid-params': [{ campo: 'login', razão: 'você deve indicar um email correto' }]
      })
    }
    const token = jwt.sign({ id, nome, email }, 'chaveSecreta', { expiresIn: '10m' })
    console.log(token)
    res.status(200).json({ email, token })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({
      mensagem: 'Erro interno no servidor',
      detail: error
    })
  }
}

export const cadastraPessoa = (req: Request, res: Response): void => {
  const nome: string = req.body.nome
  const idade: number = parseInt(req.body.idade)
  const email: string = req.body.email
  const id: string = uuidv4()

  const palavraRestrita: string[] = ['da', 'de', 'a', 'e']
  const listaNomeMinusculo: string[] = nome.toLowerCase().split(' ')
  let nomeTratado: string = ''
  const temNumeros: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  for (let i = 0; i < listaNomeMinusculo.length; i++) {
    if (temNumeros.includes(listaNomeMinusculo[i])) {
      res.status(400).json({
        message: 'Nome inválido',
        detalhes: 'Nome não pode ter numeros',
        'invalid-params': [{ campo: 'nome', razão: 'você deve indicar um nome válido' }]
      })
    }
    if (!palavraRestrita.includes(listaNomeMinusculo[i])) {
      nomeTratado += listaNomeMinusculo[i].charAt(0).toUpperCase() + listaNomeMinusculo[i].slice(1) + ' '
    } else {
      nomeTratado += listaNomeMinusculo[i] + ' '
    }
  }

  if (nomeTratado.length < 5) {
    res.status(400).json({
      mensagem: 'Nome inválido',
      detalhes: 'Nome deve ter pelo menos 5 caracteres',
      'invalid-params': [{ campo: 'nome', razão: 'você deve indicar um nome válido' }]
    })
    return
  }

  if (!email.includes('@')) {
    res.status(400).json({
      mensagem: 'Email inválido',
      detalhes: 'Email deve conter o caractere @',
      'invalid-params': [{ campo: 'email', razão: 'você deve indicar um email correto' }]
    })
    return
  }

  if (idade < 18 || idade > 66) {
    res.status(400).json({
      mensagem: 'Idade inválida',
      detalhes: 'Idade deve estar entre 18 e 66',
      'invalid-params': [{ campo: 'idade', razão: 'você deve indicar uma idade válida' }]
    })
    return
  }

  const pessoa = new Pessoa(id, nome, idade, email)
  banco.listaPessoa.push(pessoa)
  res.status(201).json({ mensagem: 'Pessoa cadastrada com sucesso', pessoa })
}

export const listaCadastro = (req: Request, res: Response): void => {
  if (banco.listaPessoa.length === 0) {
    res.status(200).json({ listaCadastro: banco.listaPessoa })
    return
  }
  res.json(banco.listaPessoa)
}

export const recuperarPessoa = (req: Request, res: Response): void => {
  const id: string = req.params.id
  const pessoaEncontrada = banco.listaPessoa.findIndex(pessoa => pessoa.id === id)
  if (pessoaEncontrada === undefined || pessoaEncontrada < 0) {
    res.status(404).json({ message: 'Pessoa não encontrada' })
    return
  }
  const pessoaRecuperada = banco.listaPessoa[pessoaEncontrada]
  res.status(404).json(pessoaRecuperada)
}

export const atualizarPessoa = (req: Request, res: Response): void => {
  const id: string = req.params.id
  const nome: string = req.body.nome
  const idade: number = parseInt(req.body.idade)
  const email: string = req.body.email

  const atualizacaoPessoa = banco.listaPessoa.findIndex(pessoa => pessoa.id === id)
  if (atualizacaoPessoa === undefined || atualizacaoPessoa < 0) {
    res.status(404).json({ message: 'Pessoa não encontrada' })
    return
  }

  if ((nome === '' && nome === undefined) || (idade === null && idade === undefined) || (email === '' && email === undefined)) {
    res.status(400).json({ message: 'Nenhum dado foi informado para atualizar' })
    return
  }

  if (idade < 18 || idade > 66) {
    res.status(400).json({ message: 'Idade inválida' })
    return
  }

  if (!email.includes('@')) {
    res.status(400).json({ message: 'Email inválido' })
    return
  }

  const pessoaAtualizada = {
    id,
    nome,
    idade,
    email
  }
  banco.listaPessoa[atualizacaoPessoa] = pessoaAtualizada
  res.status(200).json({ mensagem: 'Cadastro atualizado com sucesso', pessoaAtualizada })
}

export const excluirPessoa = (req: Request, res: Response): void => {
  const id: string = req.params.id
  const pessoaExclusao = banco.listaPessoa.findIndex(pessoa => pessoa.id === id)
  if (pessoaExclusao === undefined || pessoaExclusao < 0) {
    res.status(404).json({ message: 'Pessoa não encontrada' })
    return
  }
  banco.listaPessoa.splice(pessoaExclusao, 1)
  res.status(200).send()
}
