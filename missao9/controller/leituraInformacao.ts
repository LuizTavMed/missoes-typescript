import { type Response, type Request } from 'express'
import { Banco } from '../Banco'
import { Pessoas } from '../modelo/Pessoas'
import { v4 as uuidv4 } from 'uuid'

const banco = new Banco()

export const leituraInformacao = (req: Request, res: Response): void => {
  const nome: string = req.body.nome
  const idade: number = parseInt(req.body.idade)
  const email: string = req.body.email
  const id: string = uuidv4()

  const palavrasRestritas: string[] = ['da', 'de', 'a', 'e']
  const listaNomeMinusculo: string[] = nome.toLowerCase().split(' ')
  let nomeTratado: string = ''
  const temNumeros: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

  for (let i = 0; i < listaNomeMinusculo.length; i++) {
    if (temNumeros.includes(listaNomeMinusculo[i])) {
      res.status(400).json({ message: 'Nome inválido' })
    } if (!palavrasRestritas.includes(listaNomeMinusculo[i])) {
      nomeTratado += listaNomeMinusculo[i].charAt(0).toUpperCase() + listaNomeMinusculo[i].slice(1) + ' '
    } else {
      nomeTratado += listaNomeMinusculo[i] + ' '
    }
  }
  if (nomeTratado.length < 4) {
    res.status(400).json({ message: 'Nome inválido' })
  }
  if (idade < 18 || idade > 66) {
    res.status(400).json({ message: 'Idade inválida' })
  }
  if (!email.includes('@')) {
    res.status(400).json({ message: 'Email inválido' })
  }

  const pessoa = new Pessoas(nomeTratado, idade, email, id)
  banco.listaPessoas.push(pessoa)
  res.status(201).json({ message: 'Cadastro realizado com sucesso' })
  console.log(banco.listaPessoas)
}

export const listaPessoasCadastradas = (req: Request, res: Response): void => {
  console.log('tem gente', banco.listaPessoas)
  if (banco.listaPessoas.length === 0) {
    res.status(200).json({ listaCadastro: banco.listaPessoas })
    return
  }
  console.log('paddou aqui')
  res.json(banco.listaPessoas)
}

export const recuperarPessoa = (req: Request, res: Response): void => {
  const id: string = req.params.id

  const pessoaRecuperacao = banco.listaPessoas.findIndex(indexPessoa => indexPessoa.id === id)
  if (pessoaRecuperacao < 0) {
    res.status(404).json({ message: 'Pessoa não encontrada' })
    return
  }

  const pessoaRecuperada = banco.listaPessoas[pessoaRecuperacao]
  res.status(200).json(pessoaRecuperada)
}

export const atualizarPessoa = (req: Request, res: Response): void => {
  const id: string = req.params.id
  const nome: string = req.body.nome
  const idade: number = parseInt(req.body.idade)
  const email: string = req.body.email

  const pessoaAtualizacao = banco.listaPessoas.findIndex(indexPessoa => indexPessoa.id === id)
  if (pessoaAtualizacao < 0) {
    res.status(404).json({ message: 'Pessoa não encontrada' })
  }

  if (nome === '' || idade === null || email === '') {
    res.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }

  const pessoaAtualizada = {
    nome,
    idade,
    email,
    id
  }

  banco.listaPessoas[pessoaAtualizacao] = pessoaAtualizada
  res.status(200).json(pessoaAtualizada)
}

export const excluirPessoa = (req: Request, res: Response): void => {
  const id: string = req.params.id

  const pessoaExclusao = banco.listaPessoas.findIndex(indexPessoa => indexPessoa.id === id)
  if (pessoaExclusao < 0) {
    res.status(404).json({ message: 'Pessoa não encontrada' })
    return
  }
  banco.listaPessoas.splice(pessoaExclusao, 1)
  res.status(200).send()
}
