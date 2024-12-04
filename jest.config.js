module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  reporters: [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "Test Case Report",
      "outputPath": "test-report.html",
    }]
  ],
  preset: 'react-native',
  // setupFilesAfterEnv: [
  //   '@testing-library/jest-native/extend-expect',
  //   '<rootDir>/jest.setup.js'
  // ],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation)/)'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js'
  ]
};
