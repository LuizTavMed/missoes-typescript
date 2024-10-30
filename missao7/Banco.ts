import { Pessoa } from "./Pessoa"

export class Banco {
    listaPessoa: Pessoa[];
    constructor() {
        this.listaPessoa = [];
    }

    cadastraPessoa(pessoa: Pessoa): void {
        this.listaPessoa.push(pessoa)
    }

    buscaTodasPessoas() {
        return this.listaPessoa
    }
}
// const lista = new Banco()
// lista.cadastraPessoa()