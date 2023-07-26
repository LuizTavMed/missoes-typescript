import UuidGenerator from '../../helper/UuidGenerator'

test('Should verify if token generator actually generates valid tokens', async () => {
  const uuidGenerator = new UuidGenerator()
  expect(uuidGenerator.generate()).toBeDefined()
})
