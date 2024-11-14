import { type Request, type Response } from 'express'
import banco from '../missao test15/bancoDados/bancos'
import { v4 as uuidv4 } from 'uuid'

export const cadastroADM = async (req: Request, res: Response): Promise<void> => {
  const nome: string = req.body.nome
  const email: string = req.body.email
  const senha: string = req.body.senha
  const codigo: string = uuidv4()

  try {
    const bd = await banco()
    const query = 'INSERT INTO pessoas ( nome, email, senha, codigo ) VALUES (?, ?, ?, ?)'
    await bd.execute(query, [nome, email, senha, codigo])
    res.status(201).json({ message: 'Pessoa cadastrada com sucesso' })
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}

export const loginADM = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email
  const senha: string = req.body.senha

  // os dados do adm tem que bater com o cadastroADM para poder logar na rota.
}
