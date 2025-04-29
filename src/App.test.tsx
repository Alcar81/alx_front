// 📁 src/App.test.tsx

import { render, screen } from "@testing-library/react";
import { configSchema } from "@/config/configSchema"; // ✅ validation Zod ici
import mockConfigs, { MockConfig } from "./mocks/mockConfigs";

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

  const setupMockConfig = (configMock: MockConfig) => {
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
    const App = setupMockConfig(mockConfigs.maintenanceOn);
    render(<App />);
    expect(screen.getByTestId("maintenance-mode")).toBeInTheDocument();
  });

  test("renders Layout when maintenance mode is inactive", () => {
    const App = setupMockConfig(mockConfigs.maintenanceOff);
    render(<App />);
    expect(screen.getByTestId("main-layout")).toBeInTheDocument();
  });

  test("validates required configuration keys", () => {
    const App = setupMockConfig(mockConfigs.missingApiUrl);
    render(<App />);

    const calls = consoleErrorSpy.mock.calls;
    const found = calls.some(call => {
      return (
        typeof call[0] === "string" &&
        call[0].includes("Erreurs de configuration détectées") &&
        Array.isArray(call[1]) &&
        call[1].some(item =>
          typeof item === "string" && item.includes("REACT_APP_API_URL n'est pas défini")
        )
      );
    });

    expect(found).toBe(true);
  });

  test("outputs debug information when debug mode is enabled", () => {
    const App = setupMockConfig(mockConfigs.debugMode);
    render(<App />);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "🧪 Mode debug activé :",
      {
        API_URL: mockConfigs.debugMode.REACT_APP_API_URL,
        FRONTEND_URL: mockConfigs.debugMode.REACT_APP_FRONTEND_URL,
        WEBSITE_NAME: mockConfigs.debugMode.REACT_APP_WEBSITE_NAME,
        ENABLE_DEBUG: mockConfigs.debugMode.REACT_APP_ENABLE_DEBUG,
        MAINTENANCE_MODE: mockConfigs.debugMode.REACT_APP_MAINTENANCE_MODE,
      }
    );
  });
});
