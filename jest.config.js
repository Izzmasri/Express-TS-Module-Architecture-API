/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.js"],
  transform: {
    // Use ts-jest to transform both .ts and .js files
    "^.+\\.(t|j)s$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@faker-js/faker)"],
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point
    // See: https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve("uuid"),
  },
};
