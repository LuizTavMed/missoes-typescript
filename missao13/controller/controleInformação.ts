import { type Request, type Response, type NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
// import { Pessoa } from '../modeloPessoa/Pessoa'
import banco from '../bancoDados/banco'
// import { type JwtPayload } from 'jsonwebtoken'

// const banco: Banco = new Banco()

export const loginPessoas = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.login
  const senha: number = parseInt(req.body.senha)
  const id: string = uuidv4()
  const nome: string = 'Luiz Fernando Tavares de Medeiros'
  try {
    if (email !== 'luiz@gmail.com' || senha !== 12345) {
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

export const cadastraPessoa = async (req: Request, res: Response): Promise<void> => {
  const nome: string = req.body.nome
  if (nome === undefined || nome === null) {
    res.status(400).json({
      message: 'Nome inválido',
      details: 'Nome não pode ser vazio',
      'invalid-params': [{ campo: 'nome', razão: 'você deve indicar um nome válido' }]
    })
    return
  }
  const email: string = req.body.email
  if (email === undefined || email === null) {
    res.status(400).json({
      message: 'Email inválido',
      details: 'Email não pode ser vazio',
      'invalid-params': [{ campo: 'email', razão: 'você deve indicar um email válido' }]
    })
    return
  }
  const idade: number = parseInt(req.body.idade)
  if (idade === undefined || idade === null) {
    res.status(400).json({
      message: 'Idade inválida',
      details: 'Idade não pode ser vazia',
      'invalid-params': [{ campo: 'idade', razão: 'você deve indicar uma idade válida' }]
    })
    return
  }
  const id: string = uuidv4()

  const palavrasRestritas: string[] = ['da', 'de', 'a', 'e']
  const stringLetrasProibidas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '_', '+', '=']
  const frasesMinusculasSeparadas = nome.toLowerCase().split(' ')
  let nomeTratado: string = ''

  for (let i = 0; i < frasesMinusculasSeparadas.length; i++) {
    if (stringLetrasProibidas.includes(frasesMinusculasSeparadas[i])) {
      res.status(400).json({
        message: 'Nome inválido',
        details: 'Nome não pode ter caracteres especiais nem números',
        'invalid-params': [{ campo: 'nome', razão: 'você deve indicar um nome válido' }]
      })
    }
    if (!palavrasRestritas.includes(frasesMinusculasSeparadas[i])) {
      nomeTratado += frasesMinusculasSeparadas[i].charAt(0).toUpperCase() + frasesMinusculasSeparadas[i].slice(1) + ' '
    } else {
      nomeTratado += frasesMinusculasSeparadas[i] + ' '
    }
  }

  if (nomeTratado.length < 5) {
    res.status(400).json({
      message: 'Nome inválido',
      details: 'O nome deve ter pelo menos 4 caractere'
    })
    return
  }

  if (!email.includes('@')) {
    res.status(400).json({
      message: 'Email inválido',
      details: 'Email deve conter o caractere @',
      'invalid-params': [{ field: 'email', reason: 'você deve indicar um email válido' }]
    })
    return
  }

  if (idade < 18 || idade > 66) {
    res.status(400).json({
      message: 'Idade inválida',
      details: 'Idade deve estar entre 18 e 66',
      'invalid-params': [{ field: 'idade', reason: 'você deve indicar uma idade válida' }]
    })
    return
  }

  try {
    const bd = await banco()
    console.log('Banco conectado (campos cadastro)', bd)
    const query = 'INSERT INTO pessoas ( nome, email, idade, id) VALUES (?,?,?,?)'
    await bd.execute(query, [nomeTratado, email, idade, id])
    res.status(201).json({ message: 'Pessoa cadastrada com sucesso' })
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}

export const listaCadastro = async (req: Request, res: Response): Promise<void> => {
  try {
    const bd = await banco()
    const query = 'SELECT * FROM pessoas'
    const resultado = await bd.query(query)
    if (resultado === 0) res.status(200).json({ messagem: 'Nenhuma pessoa cadastrada' })
    else res.status(200).json(resultado)
  } catch (error) {
    console.error('Error na listagem: ', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}

export const recuperarPessoa = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id

  try {
    const bd = await banco()
    const query = 'SELECT * FROM pessoas WHERE id =?'
    const resultado = await bd.query(query, [id])
    res.status(200).json({ messagem: resultado })
  } catch (error) {
    console.error('Error ao recuperar pessoa: ', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}

export const atualizarPessoa = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id
  const nome: string = req.body.nome
  const idade: number = parseInt(req.body.idade)
  const email: string = req.body.email

  try {
    const bd = await banco()

    if (nome === undefined || nome === null || email.length <= 3) {
      res.status(400).json({ message: 'Nome ou email inválidos' })
      return
    }
    if (idade < 18 || idade > 66 || idade === undefined || idade === null) {
      res.status(400).json({ message: 'Idade inválida' })
      return
    }
    if (email === undefined || email === null || !email.includes('@')) {
      res.status(400).json({ message: 'Email inválido' })
      return
    }
    const query = 'UPDATE pessoas SET nome =?, idade =?, email =? WHERE id =?'
    const resultado = await bd.execute(query, [nome, idade, email, id])
    if (resultado === 0) {
      res.status(404).json({ messagem: 'Lista vazia' })
      return
    }
    res.status(200).json({ message: 'Pessoa atualizada com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Error no servidor', detail: error })
  }
}

export const excluirPessoa = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  try {
    const bd = await banco()
    const query = 'DELETE FROM pessoas WHERE id =?'
    const resultado = await bd.execute(query, [id])
    if (resultado === 0) {
      res.status(404).json({ messagem: 'Pessoa não encontrada' })
      return
    }
    res.status(200).json({ message: 'Pessoa excluída com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Error no servidor', detail: error })
  }
}
