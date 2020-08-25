const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js",
  },
  testMatch: ["**/test/**/*.spec.(ts|js)"],
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "src/",
  }),
};
