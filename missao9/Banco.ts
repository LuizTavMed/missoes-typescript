import { type Pessoas } from './modelo/Pessoas'

export class Banco {
  listaPessoas: Pessoas[]
  constructor () {
    this.listaPessoas = []
  }

  // cadastraPessoa (pessoa: Pessoas): void {
  //   this.listaPessoas.push(pessoa)
  // }

  // buscaPessoa (): Pessoas[] {
  //   return this.listaPessoas
  // }
}
