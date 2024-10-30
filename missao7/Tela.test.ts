import { Tela } from './Tela'
import { Pessoa } from './Pessoa'

const tela = new Tela()

test('Teste do escolha', () => {
  const opcao = tela.escolhaOpcoes()
  expect(opcao).toBe('1')
})

test('teste do cadastro de dados', () => {
  const pessoa = tela.telaCadastro()
  expect(pessoa).toBeInstanceOf(Pessoa)
  expect(pessoa.nome).toBe('Luiz ')
  expect(pessoa.nome).not.toBe(undefined)
  expect(pessoa.nome).not.toBe(null)
  expect(pessoa.nome).not.toBe('')
  expect(pessoa.email).toBe('luiz@luiz')
  expect(pessoa.email).not.toBe(undefined)
  expect(pessoa.email).not.toBe(null)
  expect(pessoa.email).not.toBe('')
  expect(pessoa.idade).toBe(23)
  expect(pessoa.idade).not.toBe(undefined)
  expect(pessoa.idade).not.toBe(null)
  expect(pessoa.idade).not.toBe('')
})
