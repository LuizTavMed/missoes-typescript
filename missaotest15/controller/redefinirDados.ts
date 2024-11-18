import { type Request, type Response } from 'express'
import banco from '../bancoDados/bancos'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'

export const trocarSenha = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email
  // const senhaAtual: string = req.body.senhaAtual
  const novaSenha: string = req.body.novaSenha

  try {
    const bd = await banco()
    const query = 'SELECT * FROM usuarios WHERE email =?'
    const [resultado]: any[] = await bd.query(query, [email])
    if (resultado.email !== email) {
      res.status(404).json({ message: 'Usuário não encontrado' })
      return
    }

    if (resultado.email === email) {
      //  verificar se a senha atual é valida
      //  vai receber o codigo no email
      // const uuid = uuidv4()
      //  comparar os codigos
      // se forem iguais, trocar senha
      const senhaNovaHash = await bcrypt.hash(novaSenha, 10)
      if (senhaNovaHash === resultado.senha) {
        res.status(400).json({ message: 'Senha inválida' })
      } else {
        const queryAtualizacao = 'UPDATE tabela_adm SET senha =? WHERE email =?'
        await bd.query(queryAtualizacao, [senhaNovaHash, email])
        res.status(200).json({ message: 'Senha trocada com sucesso' })
      }
    }
  } catch (error) {
    console.error('Error ao trocar senha: ', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}
