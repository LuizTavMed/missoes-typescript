import LogValidator from "../../src/api/validator/LogValidator";

test('Should verify if log is valid', () => {
  const logValidator = new LogValidator()
  expect(logValidator.isValid('validLog')).toBe(true);
  expect(logValidator.isValid('')).toBe(false);
})