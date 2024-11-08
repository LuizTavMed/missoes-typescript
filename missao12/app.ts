import * as express from 'express'
import rotas from '../missao12/rotas/rotas'

const app = express()

app.use(express.json())
app.use(rotas)

app.listen(3006, () => {
  console.log('Servidor rodando na porta 3006!')
  console.log('Acessar http://localhost:3006')
})
