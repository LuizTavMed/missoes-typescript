// instanciando classes
import LogEntity from '../../src/api/entity/LogEntity'
import UserEntity from '../../src/api/entity/UserEntity'
import Mariadb from '../../src/data/Mariadb'
const mariadb = new Mariadb([LogEntity, UserEntity])

test('check if database connects', async () => {
  expect(mariadb.isInitialized).toBe(false)
  await mariadb.start()
  expect(mariadb.isInitialized).toBe(true)
  await mariadb.stop()
})
