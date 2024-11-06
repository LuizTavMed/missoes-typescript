// id, nome, email, token
export class Pessoa {
  id: string
  nome: string
  email: string
  token: string
  constructor (id: string, nome: string, email: string, token: string) {
    this.id = id
    this.nome = nome
    this.email = email
    this.token = token
  }
}
