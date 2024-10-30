function testeCapitalizar () {
    function capitalizadorLetras (frase: string){
        const palavrasRestritas: string[] = ["da","de","a","e"];
        const palavrasSeparadas = frase.toLowerCase().split(' ');
        let fraseTratada: string = "";

        for (let i=0; i<palavrasSeparadas.length; i++){
            if (!palavrasRestritas.includes(palavrasSeparadas[i])){
                fraseTratada += palavrasSeparadas[i].charAt(0).toUpperCase() + palavrasSeparadas[i].slice(1) + " ";
            } else{
                fraseTratada += palavrasSeparadas[i] + " ";
            }
            return fraseTratada;
        }
    }
    
    const fraseParaCapitalizar1: string = "unidade de sistema e aplicativos";
    const fraseParaCapitalizar2: string = "software livre e de código aberto";
    const fraseParaCapitalizar3: string = "UNIDADE DE SISTEMA E APLICATIVO";

    const novaFrase1 = capitalizadorLetras(fraseParaCapitalizar1);
    const novaFrase2 = capitalizadorLetras(fraseParaCapitalizar2);
    const novaFrase3 = capitalizadorLetras(fraseParaCapitalizar3);

    if (novaFrase1 === "Unidade de Sistema e Aplicativos"){
        console.log("Teste 1: passou");
    }else{
        console.log("Teste 1: não passou");
    }

    if (novaFrase2 === "Software Livre e de Código Aberto"){
        console.log("Teste 2: passou");
    }else{
        console.log("Teste 2: não passou");
    }

    if (novaFrase3 === "Unidade de Sistema e Aplicativo"){
        console.log("Teste 3: passou");
    }else{
        console.log("Teste 3: não passou");
    }
}
testeCapitalizar()