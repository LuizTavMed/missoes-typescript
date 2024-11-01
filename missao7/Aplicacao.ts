import { Tela } from './Tela'
import { Banco } from './Banco'

class Aplicacao {
  tela: Tela
  banco: Banco
  constructor () {
    this.tela = new Tela()
    this.banco = new Banco()
  }

  iniciar (): void { // não sei pq o do void não
    let opcao: string = ''
    while (opcao !== '0') {
      opcao = this.tela.escolhaOpcoes()
      switch (opcao) {
        case '1':{
          // cadastro;
          const pessoa = this.tela.telaCadastro()
          this.banco.cadastraPessoa(pessoa)
          break
        }
        case '2':{
          // lista;
          const listagem = this.banco.buscaTodasPessoas()
          this.tela.listaPessoaArmazenadas(listagem)
          break
        }
        case '0':
          console.log('Saindo...')
          break
        default:
          console.log('Opção inválida. Tente novamente.')
          break
      }
    }
  }
}
const app = new Aplicacao()
app.iniciar()
