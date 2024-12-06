import { type Request, type Response } from 'express'
import banco from '../bancoDados/bancos'
import * as bcrypt from 'bcrypt'

// preciso troca a senha, atualizar no banco ? já que já recebi o codigo no email, então eu uso a troca... vamos ver se presta

export const trocaDaSenha = async (req: Request, res: Response): Promise<void> => {
  const codigoValidacao = req.params.id
  const novaSenha: string = req.body.novaSenha

  try {
    const bd = await banco()
    const query = 'UPDATE tabela_adm SET senha = ? WHERE codigo = ?'
    const hashNovaSenha = await bcrypt.hash(novaSenha, 10)
    await bd.execute(query, [hashNovaSenha, codigoValidacao])
    res.status(200).json({ message: 'Senha trocada com sucesso' })
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}
