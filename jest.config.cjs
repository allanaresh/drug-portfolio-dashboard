/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.tsx",
    "<rootDir>/lib/**/*.ts",
    "<rootDir>/lib/**/*.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
