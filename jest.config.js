// 📁 jest.config.js

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
  moduleNameMapper: {
    // Mapper les alias TypeScript
    "^@/(.*)$": "<rootDir>/src/$1",

    // ✅ Mapper les fichiers CSS, SCSS, etc.
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",

    // ✅ Mapper les fichiers statiques comme images ou vidéos
    "\\.(jpg|jpeg|png|gif|mp4|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(@mui|your-other-esm-packages)/)"],
};
