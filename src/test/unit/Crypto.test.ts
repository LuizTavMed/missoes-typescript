import Crypto from '../../helper/Crypto'

test('Should verify if password hashed passwords can be compared', async () => {
  const crypto = new Crypto()
  const password = 'passwordToHash'
  const hash = await crypto.getPasswordHash(password)
  expect(crypto.areTheyHashmatched(password, hash)).toBeTruthy()
})
