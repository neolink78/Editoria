/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  preset: "ts-jest",
  testEnvironment: "node",
};
