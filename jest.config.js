module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  passWithNoTests: true,
  snapshotSerializers: ['jest-serializer-path'],
}
