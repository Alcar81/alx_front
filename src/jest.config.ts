// 📁 jest.config.ts

import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts" // 🛠️ Ton vrai fichier de setup ici
  ],
};

export default config;
