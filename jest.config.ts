import type { Config } from '@jest/types'
import jestModuleNameMapper from "jest-module-name-mapper"

// For possible configuration options see: https://jestjs.io/docs/configuration
// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  forceExit: true,
  // clearMocks: true,
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
    // When wanting to only test one file for simplicity purposes or test suite debugging
    // "**/**/__tests__/app/graphql/awarded_badges/query/awardedBadgesByUserId.test.ts",
    // "**/**/__tests__/services/apollo.test.ts",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  coverageDirectory: "<rootDir>/coverage",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/__tests__/**",
    "!**/migrations/**",
    "!**/scheduled/**",
  ],
  /* This should be used when implementing CI tests for PR and merge checks */
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10
  //   }
  // },
  globalSetup: "<rootDir>/src/__tests__/setup/setup.api.ts",
  setupFiles: [
    "<rootDir>/src/__tests__/setup/setupFile.ts"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/src/__tests__/setup"
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "graphql", "json", "node"],
  // For mapping module aliases
  moduleNameMapper: jestModuleNameMapper()
}

export default config