function letrasMaiusculas (frase: string) {
    const palavrasRestritas: string[] = ["da","de","a","e"]

    const palavrasSeparadas = frase.toLowerCase().split(' ')
    let fraseTratada: string = ""

    for(let i=0; i<palavrasSeparadas.length; i++){
        if(!palavrasRestritas.includes(palavrasSeparadas[i])){
            fraseTratada += palavrasSeparadas[i].charAt(0).toUpperCase() + palavrasSeparadas[i].slice(1) + " "
        } else{
            fraseTratada += palavrasSeparadas[i] + " "
        }
    }
    return fraseTratada;
}

const fraseParaCapitalizar: string = "unidade de sistema e aplicativos";
const novaFrase: string = letrasMaiusculas(fraseParaCapitalizar);

console.log(novaFrase); // Saída: Unidade de Sistema e Aplicativos