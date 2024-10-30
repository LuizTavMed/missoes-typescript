let frase: string = 'O rato roeu a roupa do rei de roma'

function contadorLetraR (){
  let contador: number = 0;
  
  for (let i = 0; i < frase.length; i++){
    if (frase[i] === 'r'){
      contador++;
    }
  }
  return contador;
}
const resultado: number = contadorLetraR();
console.log(resultado);