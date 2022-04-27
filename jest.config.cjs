module.exports = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(js)$': 'babel-jest'
  },
  testMatch: ['**/?(*.)+(spec|test).[j]s?(x)']
};
