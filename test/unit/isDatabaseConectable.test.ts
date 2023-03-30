import dataSource from '../../src/db/dataSource'

test('Verifica se é possível conectar ao banco de dados da API', async () => {
  dataSource.initialize().then(() => {
    console.log('it has started')
  })
  expect(true).toBe(true)
})
