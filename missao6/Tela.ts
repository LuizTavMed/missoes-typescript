import * as rlSync from "readline-sync"
import { Pessoa } from "./Pessoa"
//import {Banco} from "./Banco"

export class Tela {
    escolhaOpcoes(): string {
        // menu de opções
        console.log("Escolha uma opção:");
        console.log("=======================");
        console.log("1 - Cadastrar");
        console.log("2 - Listar");
        console.log("0 - Sair");
        const opcao = rlSync.question("Qual opção desejada: ");
        return opcao
    }

    telaCadastro() {
        //menu de cadastro
        console.log("")
        console.log("Cadastro de Pessoa:")
        console.log("=======================")
        const palavrasRestritas: string[] = ["da", "de", "a", "e"]

        // let nome : string;
        let nome: string;
        let nomeTratado: string;
        
        while (true) {
            nome = rlSync.question("Nome: ");
            let nomeMinusculo = nome.toLowerCase().split(' ');
            nomeTratado = "";

            for(let i=0; i<nomeMinusculo.length; i++){
                if (palavrasRestritas.includes(nomeMinusculo[i])){
                    nomeTratado += nomeMinusculo[i] + " "
                }
                else{
                    nomeTratado += nomeMinusculo[i].charAt(0).toUpperCase() + nomeMinusculo[i].slice(1) + " "
                }
            }
            if(nomeTratado.length < 5) console.log("Nome inválido") 
                else break;
        }

        let email: string;
        while (true){
            email = rlSync.question("email: ")
            if(!email.includes('@')) console.log("Email inválido") 
                else break;
        }

        let idade: string;
        let nIdade: number;
        while (true){
            idade = rlSync.question("Idade: ")
            nIdade = parseInt(idade)
            if (nIdade < 18 || nIdade > 66 || isNaN(nIdade)) console.log("Idade inválida")
                else break;
        }

        const pessoa = new Pessoa(nomeTratado, email, nIdade);
        return pessoa
    }

    listaPessoaArmazenadas(listaUsuario: any) {
        console.log(listaUsuario)
        for (let i = 0; i < listaUsuario.length; i++) {
            const pessoa: any = listaUsuario[i]
            console.log("=======================")
            console.log("Nome: " + pessoa.nome)
            console.log("Email: " + pessoa.email)
            console.log("Idade: " + pessoa.idade)
            console.log("=======================")
        }
    }

}