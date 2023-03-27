export const pegaDataAgora = (): string =>{
    const dataCrua = new Date
    const mes = dataCrua.getMonth()+1
    const dataFormatada: string = dataCrua.getDate()+'/'+mes+'/'+ dataCrua.getFullYear() + ' '+ dataCrua.getHours()+':'+dataCrua.getMinutes()
    return dataFormatada
}