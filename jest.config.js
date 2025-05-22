// ✅ jest.config.js (format stable recommandé)
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // ← essentiel
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
