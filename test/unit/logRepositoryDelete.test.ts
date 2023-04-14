// importando classes
import MariadbTest from '../../src/data/MariadbTest'
import LogEntity from '../../src/api/entity/LogEntity'
import LogRepository from '../../src/api/repository/LogRepository'

// instanciando classes

const mariadbTest = new MariadbTest()
const logRepository = new LogRepository(mariadbTest.dataSource, LogEntity)

test('Testando repositório de Log', async () => {
  await mariadbTest.start()
  let logList = await logRepository.getAll()
  expect(logList).toStrictEqual([])
  const createdLog = await logRepository.create('novo log')
  expect(createdLog.message).toBe('novo log')
  await logRepository.update(createdLog.id, {
    message: 'mensagem de teste',
    date: '19/04/2001'
  })
  logList = await logRepository.getAll()
  const updatedLog = await logRepository.get(createdLog.id)
  expect(updatedLog).toBe(LogEntity)
  expect(updatedLog.message).toStrictEqual('mensagem de teste')
  expect(updatedLog.date).toStrictEqual('19/04/2001')
  await logRepository.delete(createdLog.id)
  expect(logList).toStrictEqual([])
  await mariadbTest.stop()
})
