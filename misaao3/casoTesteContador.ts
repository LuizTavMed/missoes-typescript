function teste(){
    function contadorDeRs(frase: string): number{ //perdidinho rapaz
        let contador: number = 0;
        const caractere: string = "r";

        for (let i=0; i<frase.length; i++){
            if (frase[i] === caractere){
                contador++;
            }
        }
        return contador;
    }
    
    const frase1: string = "O rato roeu a roupa do rei de roma";
    const frase2: string = "o rato roeu a roupa da rainha de roma raivosamente";
    const frase3: string = "o rato rudemente roeu a roupa da rainha de roma raivosamente";

    const contador1: number = contadorDeRs(frase1);
    const contador2: number = contadorDeRs(frase2);
    const contador3: number = contadorDeRs(frase3);

    if (contador1 === 5){
        console.log(`1 ${contador1}: PASSOU`);
    }else{
        console.log(`1 ${contador1}: NÃO PASSOU`);
    }

    if (contador2 === 6){
        console.log(`2 ${contador2}: PASSOU`);
    }else{
        console.log(`2 ${contador2}: NÃO PASSOU`);
    }

    if (contador3 === 7){
        console.log(`3 ${contador3}: PASSOU`);
    }else{
        console.log(`3 ${contador3}: NÃO PASSOU`);
    }
}
teste()





















/*
const caractere = "r";
    const frase1 = "o rato roeu a roupa do rei de roma";
    const frase2 = "o rato roeu a roupa da rainha de roma raivosamente";
    const frase3 = "o rato rudemente roeu a roupa da rainha de roma raivosamente";
    
    
    
    
    const quantidadeLetras1 = contadorLetrasEsperadas(frase1, caractere);
    const quantidadeLetras2 = contadorLetrasEsperadas(frase2, caractere);
    const quantidadeLetras3 = contadorLetrasEsperadas(frase3, caractere);

    
    quantidadeLetras1 === 5 ? console.log(`1 ${quantidadeLetras1}: PASSOU`) : console.log(`1 ${quantidadeLetras1}: NÂO PASSOU`);
    quantidadeLetras2 === 6 ? console.log(`2 ${quantidadeLetras2}: PASSOU`) : console.log(`2 ${quantidadeLetras2}: NÂO PASSOU`);
    quantidadeLetras3 === 7 ? console.log(`3 ${quantidadeLetras3}: PAssou`) : console.log(`3 ${quantidadeLetras3}: NÂO PASSOU`);
    
*/