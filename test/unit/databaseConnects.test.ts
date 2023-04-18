// instanciando classes
import LogEntity from '../../src/api/entity/LogEntity'
import UserEntity from '../../src/api/entity/UserEntity'
import MariadbTest from '../../src/data/MariadbTest'
const mariadbTest = new MariadbTest([LogEntity, UserEntity])

test('check if database connects', async () => {
  expect(mariadbTest.isInitialized).toBe(false)
  await mariadbTest.start()
  expect(mariadbTest.isInitialized).toBe(true)
  await mariadbTest.stop()
})
