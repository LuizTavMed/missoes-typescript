import type * as express from 'express'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import banco from '../bancoDados/bancos'

export const loginadm = async (req: express.Request, res: express.Response): Promise<void> => {
  const email: string = req.body.email
  const senha: string = req.body.senha
  try {
    const bd = await banco()

    const queryEmail = 'SELECT * FROM tabela_adm WHERE email =?'
    const resultado = await bd.query(queryEmail, [email])

    if (resultado === null || resultado.length === 0) {
      res.status(401).json({ message: 'Email inválido' })
      return
    }

    const comparaSenha = await bcrypt.compare(senha, resultado.senha)

    if (!comparaSenha) {
      res.status(401).json({ message: 'Senha inválida' })
      return
    }

    const token = jwt.sign({ email, senha }, 'chaveSecreta', { expiresIn: '10m' })
    res.status(200).json({ message: 'Login efetuado com sucesso', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro interno no servidor' })
  }
}
