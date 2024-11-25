import banco from '../../bancoDados/bancos'
import { v4 as uuidv4 } from 'uuid'
import { type Request, type Response } from 'express'

export const cadastraPessoa = async (req: Request, res: Response): Promise<void> => {
  const nome: string = req.body.nome
  if (nome === undefined || nome === null) {
    res.status(400).json({
      message: 'Nome inválido',
      details: 'Nome não pode ser vazio',
      'invalid-params': [{ campo: 'nome', razão: 'você deve indicar um nome válido' }]
    })
    return
  }
  const palavrasRestritas: string[] = ['da', 'de', 'a', 'e']
  const stringsProibidas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '_', '+', '=']
  const frasesMinusculasSeparados = nome.toLowerCase().split(' ')
  let nomeTratado: string = ''

  for (let i = 0; i < frasesMinusculasSeparados.length; i++) {
    if (stringsProibidas.includes(frasesMinusculasSeparados[i])) {
      res.status(400).json({
        message: 'Nome inválido',
        details: 'Nome não pode ter caracteres especiais nem números',
        'invalid-params': [{ campo: 'nome', razão: 'você deve indicar um nome válido' }]
      })
      return
    }
    if (!palavrasRestritas.includes(frasesMinusculasSeparados[i])) {
      nomeTratado += frasesMinusculasSeparados[i].charAt(0).toUpperCase() + frasesMinusculasSeparados[i].slice(1) + ' '
    } else {
      nomeTratado += frasesMinusculasSeparados[i] + ' '
    }
  }
  const email: string = req.body.email
  if (email === undefined || email === null) {
    res.status(400).json({
      message: 'Email inválido',
      details: 'Email não pode ser vazio',
      'invalid-params': [{ campo: 'email', razão: 'você deve indicar um email válido' }]
    })
    return
  }
  const idade: number = parseInt(req.body.idade)
  if (idade === undefined || idade === null) {
    res.status(400).json({
      message: 'Idade inválida',
      details: 'Idade não pode ser vazia',
      'invalid-params': [{ campo: 'idade', razão: 'você deve indicar uma idade válida' }]
    })
    return
  }
  const id = uuidv4()

  try {
    const bd = await banco()
    const query = 'INSERT INTO pessoa (nome, email, idade, id) VALUES (?, ?, ?)'
    await bd.execute(query, [nomeTratado, email, idade, id])
    res.status(201).json({ message: 'Pessoa cadastrada com sucesso' })
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error)
    res.status(500).json({ message: 'Erro interno no servidor', detail: error })
  }
}
