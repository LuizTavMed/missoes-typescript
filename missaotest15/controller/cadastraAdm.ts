import { type Request, type Response } from 'express'
import banco from '../bancoDados/bancos'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'

export const cadastroADM = async (req: Request, res: Response): Promise<void> => {
  const nome: string = req.body.nome
  const email: string = req.body.email
  const senha: string = req.body.senha

  try {
    const bd = await banco()
    const hashSenha = await bcrypt.hash(senha, 10)
    const codigo: string = uuidv4()
    const query = 'INSERT INTO tabela_adm ( nome, email, senha, codigo ) VALUES (?, ?, ?, ?)'
    await bd.execute(query, [nome, email, hashSenha, codigo])
    res.status(201).json({ message: 'Pessoa cadastrada com sucesso' })
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}
