import app from "./api/app"
import dataSource from "./db/dataSource"

dataSource.initialize().then(() =>{
    console.log("banco de dados inicializado")
    app.listen(process.env.PORT_API, () =>{
        console.log(`aplicação iniciada na porta ${process.env.PORT_API}`)
    })
})
