export const converteData = (data: string): string => {
  const dataCrua = new Date(data)
  const ano = dataCrua.getFullYear()
  const mes = dataCrua.getMonth() + 1
  const dia = dataCrua.getDate() + 1
  const dataFormatada = dia + '/' + mes + '/' + ano
  return dataFormatada
}
