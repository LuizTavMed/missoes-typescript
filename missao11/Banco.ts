import { type Pessoa } from './Pessoa'

export class Banco {
  listaPessoas: Pessoa[]
  constructor () {
    this.listaPessoas = []
  }
}
