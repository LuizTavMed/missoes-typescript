import * as express from 'express'
import rotas from '../missao11/rotas/rotas'

const app = express()

app.use(express.json())
app.use(rotas)

app.listen(3005, () => {
  console.log('Servidor rodando na porta 3005!')
  console.log('Acessar http://localhost:3005')
})
