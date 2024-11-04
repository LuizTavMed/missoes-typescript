import * as express from 'express'
import rotas from '../missao9/rotas/rotas'

const app = express()

app.use(express.json())
app.use(rotas)

app.listen(3003, () => {
  console.log('Servidor rodando na porta 3003!')
  console.log('Acessar http://localhost:3003')
})

// concertar esse recuperar
// tratar as saidas da atualização e da exclução
