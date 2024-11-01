import express, { type Application } from 'express'
import rotas from './rotas'

const app: Application = express()

app.use(express.json())
app.use(rotas)

app.listen(3002, () => {
  console.log('Servidor rodando na porta 3002!')
  console.log('Acessar http://localhost:3002')
})
