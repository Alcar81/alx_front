import React from 'react';
import { render, screen } from '@testing-library/react';
import dotenv from 'dotenv';

// Charger les variables d'environnement pour les tests
dotenv.config();

// Mock des sous-composants pour éviter les dépendances externes
jest.mock('./components/pages/Maintenance/Maintenance', () => {
  return () => <div data-testid="maintenance-mode">Maintenance Mode</div>;
});

jest.mock('./components/Layout/Layout', () => {
  return () => <div data-testid="main-layout">Main Layout</div>;
});

describe('App Component', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeAll(() => {
    // Mock console.error et console.log une seule fois pour tous les tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restaurer les mocks après tous les tests
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  beforeEach(() => {
    // Réinitialiser les modules avant chaque test pour éviter les interférences
    jest.resetModules();
  });

  test('renders Maintenance page when maintenance mode is active', () => {
    jest.mock('./config/config', () => ({
      __esModule: true,
      default: {
        REACT_APP_API_URL: 'https://api.example.com',
        REACT_APP_FRONTEND_URL: 'https://frontend.example.com',
        REACT_APP_WEBSITE_NAME: 'AlxMultimedia',
        REACT_APP_MAINTENANCE_MODE: true,
        REACT_APP_ENABLE_DEBUG: false,
      },
    }));

    const App = require('./App').default;

    render(<App />);

    const maintenanceElement = screen.getByTestId('maintenance-mode');
    expect(maintenanceElement).toBeInTheDocument();
  });

  test('renders Layout when maintenance mode is inactive', () => {
    jest.mock('./config/config', () => ({
      __esModule: true,
      default: {
        REACT_APP_API_URL: 'https://api.example.com',
        REACT_APP_FRONTEND_URL: 'https://frontend.example.com',
        REACT_APP_WEBSITE_NAME: 'AlxMultimedia',
        REACT_APP_MAINTENANCE_MODE: false,
        REACT_APP_ENABLE_DEBUG: false,
      },
    }));

    const App = require('./App').default;

    render(<App />);

    const layoutElement = screen.getByTestId('main-layout');
    expect(layoutElement).toBeInTheDocument();
  });

  test('validates required configuration keys', () => {
    // Mock de la configuration avec une valeur manquante
    jest.mock('./config/config', () => ({
      __esModule: true,
      default: {
        REACT_APP_API_URL: undefined, // Clé manquante
        REACT_APP_FRONTEND_URL: 'https://frontend.example.com',
        REACT_APP_WEBSITE_NAME: 'AlxMultimedia',
        REACT_APP_MAINTENANCE_MODE: false,
        REACT_APP_ENABLE_DEBUG: false,
      },
    }));

    const App = require('./App').default;

    render(<App />);

    expect(consoleErrorSpy).toHaveBeenCalled(); // Vérifie qu'une erreur est appelée
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erreurs de configuration détectées :",
      ["REACT_APP_API_URL n'est pas défini dans le fichier .env ou config.ts"]
    );
  });

  test('outputs debug information when debug mode is enabled', () => {
    jest.mock('./config/config', () => ({
      __esModule: true,
      default: {
        REACT_APP_API_URL: 'https://api.example.com',
        REACT_APP_FRONTEND_URL: 'https://frontend.example.com',
        REACT_APP_WEBSITE_NAME: 'AlxMultimedia',
        REACT_APP_MAINTENANCE_MODE: false,
        REACT_APP_ENABLE_DEBUG: true, // Activer le mode debug
      },
    }));

    const App = require('./App').default;

    render(<App />);

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Mode debug activé. Configuration actuelle :",
      {
        REACT_APP_API_URL: "https://api.example.com",
        REACT_APP_FRONTEND_URL: "https://frontend.example.com",
        REACT_APP_WEBSITE_NAME: "AlxMultimedia",
        REACT_APP_MAINTENANCE_MODE: false,
        REACT_APP_ENABLE_DEBUG: true,
      }
    );
  });
});
