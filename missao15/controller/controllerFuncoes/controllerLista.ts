import { type Request, type Response } from 'express'
import banco from '../../bancoDados/bancos'

export const listaCadastros = async (req: Request, res: Response): Promise<void> => {
  try {
    const bd = await banco()
    const query = 'SELECT * FROM pessoas'
    const resultado = await bd.query(query)
    if (resultado === 0) res.status(200).json({ message: 'Nenhum cadastro realizado' })
    else res.status(200).json(resultado)
  } catch (error) {
    console.error('Error ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}
