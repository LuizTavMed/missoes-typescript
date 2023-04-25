import LogValidator from '../../src/api/validator/LogValidator'

test('Should verify if log is valid', () => {
  const logValidator = new LogValidator()
  expect(logValidator.isLogValid('validLog')).toBe(true)
  expect(logValidator.isLogValid('')).toBe(false)
})
