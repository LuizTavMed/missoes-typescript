import { type Response, type Request } from 'express'
import { Banco } from '../Banco'
import { Pessoa } from '../Pessoa'

const banco = new Banco()

export const cadastraInformacaoPessoa = (req: Request, res: Response): void => {
  const nome: string = req.body.nome
  const email: string = req.body.email
  const idade: number = parseInt(req.body.idade)

  const palavraRestrita: string[] = ['da', 'de', 'a', 'e']
  const listaNomeMinusculo: string[] = nome.toLowerCase().split(' ')
  let nomeTratado: string = ''
  const temNumeros: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  for (let i = 0; i < listaNomeMinusculo.length; i++) {
    if (temNumeros.includes(listaNomeMinusculo[i])) {
      res.status(400).json({ message: 'Nome inválido' })
    } if (!palavraRestrita.includes(listaNomeMinusculo[i])) {
      console.log(listaNomeMinusculo)
      nomeTratado += listaNomeMinusculo[i].charAt(0).toUpperCase() + listaNomeMinusculo[i].slice(1) + ' '
      console.log(nomeTratado)
    } else {
      nomeTratado += listaNomeMinusculo[i] + ' '
    }
  }

  if (nomeTratado.length < 5) {
    res.status(400).json({ message: 'Nome inválido' })
    return
  }

  if (!email.includes('@')) {
    res.status(400).json({ message: 'Email inválido' })
    return
  }

  // if (idade === null || idade === undefined) {
  //   res.status(400).json({ message: 'Idade inválida' })
  //   return
  // }

  if (idade < 18 || idade > 66) {
    res.status(400).json({ message: 'Idade inválida' })
    return
  }

  const pessoa = new Pessoa(nomeTratado, email, idade)
  banco.listaPessoa.push(pessoa)
  res.status(201).json({ message: 'Cadastro realizado com sucesso' })
}

export const listaCadastro = (req: Request, res: Response): void => {
  if (banco.listaPessoa.length === 0) {
    res.status(200).json({ listaCadastro: banco.listaPessoa })
    return
  }
  res.json(banco.listaPessoa)
}
