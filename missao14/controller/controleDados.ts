import { type Request, type Response, type NextFunction } from 'express'
import banco from '../bancoDados/banco'
import * as jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import envioEmail from './disparoEmail'

export const loginPessoa = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.login
  const senha: number = parseInt(req.body.senha)
  const id: string = uuidv4()
  const nome: string = 'Luiz Fernando Tavares de Medeiros'

  try {
    if (email !== 'luiz@gmail.com' || senha !== 12345) {
      res.status(401).json({ mensagem: 'Credenciais inválidas' })
    } else if (!email.includes('@')) {
      res.status(400).json({
        message: 'Email inválido',
        details: 'Email deve conter o caractere @',
        'invalid-params': [{ field: 'login', reason: 'você deve indicar um email correto' }]
      })
    }
    const token = jwt.sign({ id, nome, email }, 'chaveSecreta', { expiresIn: '10m' })
    console.log(token)
    envioEmail()
    res.status(200).json({ nome, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Erro interno no servidor',
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
  })
}

export const cadastroPessoa = async (req: Request, res: Response): Promise<void> => {
  const nome: string = req.body.nome
  const email: string = req.body.email
  const idade: number = parseInt(req.body.idade)
  const id: string = uuidv4()

  try {
    const bd = await banco()
    console.log('Banco conectado (campos cadastro)', bd)
    const query = 'INSERT INTO pessoas ( nome, email, idade, id) VALUES (?,?,?,?)'
    await bd.execute(query, [nome, email, idade, id])
    res.status(201).json({ message: 'Pessoa cadastrada com sucesso' })
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}

export const listarPessoas = async (req: Request, res: Response): Promise<void> => {
  try {
    const bd = await banco()
    console.log('Banco conectado (campos listagem)', bd)
    const query = 'SELECT * FROM pessoas'
    const resultado = await bd.query(query)
    if (resultado === 0) res.status(200).json({ messagem: 'Lista de cadastro vazia' })
    else res.status(200).json(resultado)
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}

export const rescuperarPessoas = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  try {
    const bd = await banco()
    console.log('Banco conectado (campos recuperação)', bd)
    const query = 'SELECT * FROM pessoas WHERE id =?'
    const resultado = await bd.query(query, [id])
    if (resultado === 0) res.status(404).json({ message: 'Pessoa não encontrada' })
    else res.status(200).json(resultado)
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}

export const atualizarPessoa = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  const nome: string = req.body.nome
  const email: string = req.body.email
  const idade: number = parseInt(req.body.idade)

  try {
    const bd = await banco()
    console.log('Banco conectado (campos atualização)', bd)

    //  tratamento de erros

    const query = 'UPDATE pessoas SET nome =?, email =?, idade =? WHERE id =?'
    await bd.execute(query, [nome, email, idade, id])
    res.status(200).json({ message: 'Pessoa atualizada com sucesso' })
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}

export const excluirPessoa = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  try {
    const bd = await banco()
    console.log('Banco conectado (campos exclusão)', bd)
    const query = 'DELETE FROM pessoas WHERE id =?'
    const resultado = await bd.execute(query, [id])
    if (resultado === 0) {
      res.status(404).json({ message: 'Pessoa não encontrada' })
    } else {
      res.status(200).json({ message: 'Pessoa excluída com sucesso' })
    }
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}
