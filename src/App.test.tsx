// 📁 src/App.test.tsx

import { render, screen } from "@testing-library/react";
import { configSchema } from "@/config/configSchema"; // ✅ validation Zod ici
import mockConfigs, { MockConfig } from "./__tests__/mockConfigs";

if (process.env.NODE_ENV === "test") {
  require("dotenv").config();
}

// Mock des sous-composants
jest.mock("./components/pages/Maintenance/Maintenance", () => {
  return () => <div data-testid="maintenance-mode">Maintenance Mode</div>;
});

jest.mock("./components/Layout/Layout", () => {
  return () => <div data-testid="main-layout">Main Layout</div>;
});

describe("App Component", () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  const loadAppWithConfig = (configMock: MockConfig) => {
    const parsed = configSchema.safeParse(configMock);

    if (!parsed.success) {
      throw new Error(
        `❌ Config invalide pour le test :\n${JSON.stringify(parsed.error.format(), null, 2)}`
      );
    }

    jest.doMock("./config/config", () => ({
      __esModule: true,
      default: parsed.data,
    }));

    const App = require("./App").default;
    return App;
  };

  test("renders Maintenance page when maintenance mode is active", () => {
    const App = loadAppWithConfig(mockConfigs.maintenanceOn);
    render(<App />);
    expect(screen.getByTestId("maintenance-mode")).toBeInTheDocument();
  });

  test("renders Layout when maintenance mode is inactive", () => {
    const App = loadAppWithConfig(mockConfigs.maintenanceOff);
    render(<App />);
    expect(screen.getByTestId("main-layout")).toBeInTheDocument();
  });

  test("validates required configuration keys", () => {
    const App = loadAppWithConfig(mockConfigs.missingApiUrl);
    render(<App />);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erreurs de configuration détectées :",
      ["REACT_APP_API_URL n'est pas défini dans le fichier .env ou config.ts"]
    );
  });

  test("outputs debug information when debug mode is enabled", () => {
    const App = loadAppWithConfig(mockConfigs.debugMode);
    render(<App />);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Mode debug activé. Configuration actuelle :",
      mockConfigs.debugMode
    );
  });
});
