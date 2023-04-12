// importando classes
import MariadbTest from '../../src/data/MariadbTest'
import LogEntity from '../../src/api/entity/LogEntity'
import LogRepository from '../../src/api/repository/LogRepository'

// instanciando classes

const mariadbTest = new MariadbTest()
const logRepository = new LogRepository(mariadbTest.dataSource, LogEntity)

test('Testando repositório de Log', async () => {
  expect(await logRepository.getAll()).toBe([])
  await logRepository.create('testando novo log')
  
})
