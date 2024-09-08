/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line no-undef
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.env.js"], // ou "<rootDir>/jest.setup.ts" se estiver usando TypeScript
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  verbose: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// eslint-disable-next-line no-undef
module.exports = createJestConfig(config);
