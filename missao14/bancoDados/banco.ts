import * as mariadb from 'mariadb'

const poll = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mariadb',
  database: 'missao14', // trocar
  connectionLimit: 10
})

async function banco (): Promise<any> {
  try {
    const conn = await poll.getConnection()
    console.log('Conexão ao banco de dados realizada com sucesso!')
    return conn
  } catch (error) {
    console.error('Falha ao conectar ao banco de dados!')
    throw error
  }
}

export default banco
