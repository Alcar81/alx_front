// 📁 src/jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json"  // 🔥 Spécifie ici ton tsconfig pour les tests
    }
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};

export default config;
