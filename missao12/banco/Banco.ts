import { type Pessoa } from '../modelo/Pessoa'

export class Banco {
  listaPessoa: Pessoa[]
  constructor () {
    this.listaPessoa = []
  }
}
