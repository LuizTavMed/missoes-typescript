import { type Request, type Response } from 'express'
import banco from '../bancoDados/bancos'
import envioEmail from './controllerEmail/envioEmail'
// import { v4 as uuidv4 } from 'uuid'
// import * as bcrypt from 'bcrypt'

export const emailValidaTrocarSenha = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email
  if (email === undefined || email === null) {
    res.status(400).json({ message: 'Email é obrigatório' })
    return
  }
  // const senhaAtual: string = req.body.senhaAtual
  // const novaSenha: string = req.body.novaSenha

  try {
    const bd = await banco()
    const query = 'SELECT * FROM tabela_adm WHERE email =?'
    const [resultado]: any[] = await bd.query(query, [email])
    if (resultado.email === email) {
      res.status(404).json({ message: 'Usuário não encontrado' })
      return
    }

    const codigoTrocaSenha = resultado.codigo
    console.log('passou aqui', codigoTrocaSenha)
    // console.log(`Codigo de troca de senha enviado: ${codigoTrocaSenha}`)
    res.status(200).json({ message: 'Email enviado com o codigo para validação da troca de senha já encaminhado', codigo: codigoTrocaSenha })
    await envioEmail(
      'luizfernandotavaresdemedeiros@gmail.com',
      'Troca de senha',
      codigoTrocaSenha
    )
  } catch (error) {
    console.error('Error ao trocar senha: ', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}
