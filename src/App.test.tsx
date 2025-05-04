// 📁 src/App.test.tsx

import { render, screen } from "@testing-library/react";
import mockConfigs, { MockConfig } from "./mocks/mockConfigs";

if (process.env.NODE_ENV === "test") {
  require("dotenv").config();
}

// ✅ Mock des sous-composants
jest.mock("./components/pages/Maintenance/Maintenance", () => {
  return () => <div data-testid="maintenance-mode">Maintenance Mode</div>;
});

jest.mock("./components/Layouts/FlexibleLayout", () => {
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
    process.env.REACT_APP_MAINTENANCE_MODE = "false";
    process.env.REACT_APP_ENABLE_DEBUG = "false";
  });

  const setupMockEnv = (mock: MockConfig) => {
    process.env.REACT_APP_API_URL = mock.REACT_APP_API_URL || "";
    process.env.REACT_APP_FRONTEND_URL = mock.REACT_APP_FRONTEND_URL || "";
    process.env.REACT_APP_WEBSITE_NAME = mock.REACT_APP_WEBSITE_NAME || "";
    process.env.REACT_APP_MAINTENANCE_MODE = String(mock.REACT_APP_MAINTENANCE_MODE ?? false);
    process.env.REACT_APP_ENABLE_DEBUG = String(mock.REACT_APP_ENABLE_DEBUG ?? false);

    const App = require("./App").default;
    return App;
  };

  test("renders Maintenance page when maintenance mode is active", () => {
    const App = setupMockEnv(mockConfigs.maintenanceOn);
    render(<App />);
    expect(screen.getByTestId("maintenance-mode")).toBeInTheDocument();
  });

  test("renders Layout when maintenance mode is inactive", () => {
    const App = setupMockEnv(mockConfigs.maintenanceOff);
    render(<App />);
    expect(screen.getByTestId("main-layout")).toBeInTheDocument();
  });

  test("validates required configuration keys", () => {
    const App = setupMockEnv(mockConfigs.missingApiUrl);
    render(<App />);
    expect(screen.getByText("Erreur de configuration")).toBeInTheDocument();
    expect(screen.getByText("REACT_APP_API_URL est manquant.")).toBeInTheDocument();
  });

  test("outputs debug information when debug mode is enabled", () => {
    const App = setupMockEnv(mockConfigs.debugMode);
    render(<App />);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "🧪 Mode debug activé :",
      {
        REACT_APP_API_URL: mockConfigs.debugMode.REACT_APP_API_URL,
        REACT_APP_FRONTEND_URL: mockConfigs.debugMode.REACT_APP_FRONTEND_URL,
        REACT_APP_WEBSITE_NAME: mockConfigs.debugMode.REACT_APP_WEBSITE_NAME,
        REACT_APP_ENABLE_DEBUG: mockConfigs.debugMode.REACT_APP_ENABLE_DEBUG,
        REACT_APP_MAINTENANCE_MODE: mockConfigs.debugMode.REACT_APP_MAINTENANCE_MODE,
      }
    );
  });
});
