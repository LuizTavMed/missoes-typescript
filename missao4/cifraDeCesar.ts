const alfabetoMaiusculo: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','0','1','2','3','4','5','6','7','8','9'];
const alfabetoMinusculo: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','0','1','2','3','4','5','6','7','8','9'];

function eMaiuscula(frase: string){
    if(alfabetoMaiusculo.includes(frase)) return true;
    else return false;
}


function cifraDeCesar (deslocamento: number, frase: string){
    let fraseCifrada: string = '';
    //deslocamento = 2;
    let recebeMaiusculas;
    let recebeMinusculas;
    let posicaoMaiusculas;
    let posicaoMinusculas;
    let posicaoAtualizadaDeslocamentoMaiusculo;
    let posicaoAtualizadaDeslocamentoMinusculo;;
    let letrasCriptografadasMaiusculas;
    let letrasCriptografadasMinusculas;
    

    for (let i=0; i<frase.length; i++){

        if(eMaiuscula(frase[i])){
            recebeMaiusculas = frase[i];

            posicaoMaiusculas = alfabetoMaiusculo.indexOf(recebeMaiusculas);
            posicaoAtualizadaDeslocamentoMaiusculo = posicaoMaiusculas + deslocamento;
            letrasCriptografadasMaiusculas = alfabetoMaiusculo[posicaoAtualizadaDeslocamentoMaiusculo];
            fraseCifrada = fraseCifrada + letrasCriptografadasMaiusculas;
        }else{
            recebeMinusculas = frase[i];

            posicaoMinusculas = alfabetoMinusculo.indexOf(recebeMinusculas);
            posicaoAtualizadaDeslocamentoMinusculo = posicaoMinusculas + deslocamento;
            letrasCriptografadasMinusculas = alfabetoMinusculo[posicaoAtualizadaDeslocamentoMinusculo]
            fraseCifrada = fraseCifrada + letrasCriptografadasMinusculas;
        }
    }
    return fraseCifrada;
}
const cifraCesar: string = cifraDeCesar(2, "Luiz");
console.log(cifraCesar);