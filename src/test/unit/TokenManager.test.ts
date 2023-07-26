import TokenManager from '../../helper/TokenManager'

test('Should verify if token generator actually generates valid tokens', async () => {
  const tokenManager = new TokenManager()
  const id = 'randomId'
  const token = tokenManager.generate(id)
  expect(tokenManager.isValid(token)).toBeTruthy()
  expect(tokenManager.isValid('notValidToken')).toBeFalsy()
})
