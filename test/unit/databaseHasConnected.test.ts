// instanciando classes
import Mariadb from '../../src/data/Mariadb'
const mariadb = new Mariadb()

test('Verifica se a conexão com o banco de dados está sendo realizada', async () => {
  expect(mariadb.isInitialized).toBe(false)
  await mariadb.start()
  expect(mariadb.isInitialized).toBe(true)
  await mariadb.stop()
})
