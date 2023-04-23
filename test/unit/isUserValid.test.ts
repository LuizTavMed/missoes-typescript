import UserValidator from "../../src/api/validator/UserValidator"

test('Should verify if user is valid', async () => {
  const userValidator = new UserValidator()
  expect(userValidator.isUserValid('validLogin', 'validPassword', 'validPermission')).toBe(true)
  expect(userValidator.isUserValid('', '', '')).toBe(false)
  
})