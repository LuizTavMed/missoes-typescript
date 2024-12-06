import { type Request, type Response } from 'express'
import banco from '../../bancoDados/bancos'

//  Bucas o cadastro atravez do id
export const buscarUsuario = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  try {
    const bd = await banco()
    const query = 'SELECT * FROM pessoas WHERE id =?'
    const resultado = await bd.query(query, [id])
    if (resultado.length === 0) {
      res.status(404).json({ message: 'Usuário não encontrado' })
    } else {
      res.status(200).json(resultado)
    }
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}
