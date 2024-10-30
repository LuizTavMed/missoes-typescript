function contarConsoantes(frase: string) {
    let fraseTratada: string = frase.toLowerCase()
    let consoantes: number = 0;
    let valorDecimal: string = "";
    let alfabetoConsoantes: string = "bcdfghjklmnpqrstvwxyz";

    for (let i = 0; i < fraseTratada.length; i++) {
        //if (fraseTratada[i] !== 'a' || fraseTratada[i] !== 'e' || fraseTratada[i] !== 'i' || fraseTratada[i] !== 'o' || fraseTratada[i] !== 'u') {
        if (alfabetoConsoantes.includes(fraseTratada[i])){
            consoantes++;
            if (consoantes < 10) {
                valorDecimal = "0" + String(consoantes);
            }
        }
    }
    return valorDecimal
}
const quantidadeConsosnates: string = contarConsoantes("Antonia")
console.log(quantidadeConsosnates)

function contadorVogais(palavra: string) {
    let palavraTratada: string = palavra.toLowerCase() 
    let vogais: string = "aeiou";
    let valorBinario: string = "";

    for (let i = 0; i < vogais.length; i++) {
        if (palavraTratada.includes(vogais[i])) {
            valorBinario += "1";
        } else {
            valorBinario += "0";
        }
    }
    return valorBinario;
}
const valorBinario: string = contadorVogais("Antonia");
console.log(valorBinario);

const valorDecimal: number = parseInt(valorBinario, 2);

console.log(valorDecimal + quantidadeConsosnates)