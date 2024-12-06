import * as express from 'express'
import rotas from './rotas/rotas'

const app = express()

app.use(express.json())

app.use(rotas)

app.listen(3009, () => {
  console.log('Servidor rodando na porta 3009!')
  console.log('Acessar http://localhost:3009')
})
