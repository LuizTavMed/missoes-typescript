import banco from '../../bancoDados/bancos'
import { type Request, type Response } from 'express'

export const atualizarCadastro = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id

  const nome = req.body.nome
  if (nome === undefined || nome === null) {
    res.status(400).json({ message: 'Nome inválido' })
    return
  }
  const email = req.body.email
  if (email === undefined || email === null) {
    res.status(400).json({ message: 'Email inválido' })
    return
  }
  const idade = req.body.idade
  if (idade === undefined || idade === null || (idade < 18 || idade > 66)) {
    res.status(400).json({ message: 'Idade inválida' })
    return
  }
  try {
    const bd = await banco()
    const query = 'UPDATE pessoas SET nome=?, email=?, idade=? WHERE id=?'
    await bd.execute(query, [nome, email, idade, id])
    res.status(200).json({ message: 'Cadastro atualizado com sucesso' })
  } catch (error) {
    console.error('Erro ao tentar atualizar cadastro: ', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}
