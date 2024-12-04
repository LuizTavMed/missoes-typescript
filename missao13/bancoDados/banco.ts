import * as mariadb from 'mariadb'

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mariadb',
  database: 'missao13',
  connectionLimit: 10
})

async function banco (): Promise<any> {
  try {
    const conn = await pool.getConnection()
    console.log('Banco conectado.')
    return conn
  } catch (error) {
    console.error('Falha ao conectar: ', error)
    throw error
  }
}

export default banco
