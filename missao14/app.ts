import * as express from 'express'
import rotas from '../missao14/rotas/rotas'

const app = express()

app.use(express.json())

app.use(rotas)

app.listen(3008, () => {
  console.log('Servidor rodando na porta 3008!')
  console.log('Acessar http://localhost:3008')
})
