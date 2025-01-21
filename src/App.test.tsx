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
    // Mock de la configuration
    jest.mock('./config/config', () => ({
      __esModule: true,
      default: {
        REACT_APP_API_URL: 'https://api.example.com',
        REACT_APP_FRONTEND_URL: 'https://frontend.example.com',
        REACT_APP_WEBSITE_NAME: 'AlxMultimedia',
        REACT_APP_MAINTENANCE_MODE: true, // Activer le mode maintenance
        REACT_APP_ENABLE_DEBUG: false,
      },
    }));

    // Charger l'application avec le mock
    const App = require('./App').default;

    render(<App />);

    const maintenanceElement = screen.getByTestId('maintenance-mode');
    expect(maintenanceElement).toBeInTheDocument();
  });

  test('renders Layout when maintenance mode is inactive', () => {
    // Mock de la configuration
    jest.mock('./config/config', () => ({
      __esModule: true,
      default: {
        REACT_APP_API_URL: 'https://api.example.com',
        REACT_APP_FRONTEND_URL: 'https://frontend.example.com',
        REACT_APP_WEBSITE_NAME: 'AlxMultimedia',
        REACT_APP_MAINTENANCE_MODE: false, // Désactiver le mode maintenance
        REACT_APP_ENABLE_DEBUG: false,
      },
    }));

    // Charger l'application avec le mock
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
        REACT_APP_API_URL: undefined, // Configuration manquante
        REACT_APP_FRONTEND_URL: 'https://frontend.example.com',
        REACT_APP_WEBSITE_NAME: 'AlxMultimedia',
        REACT_APP_MAINTENANCE_MODE: false,
        REACT_APP_ENABLE_DEBUG: false,
      },
    }));

    // Charger l'application avec le mock
    const App = require('./App').default;

    render(<App />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("REACT_APP_API_URL n'est pas défini dans le fichier .env ou config.ts")
    );
  });

  test('outputs debug information when debug mode is enabled', () => {
    // Mock de la configuration avec le mode debug activé
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

    // Charger l'application avec le mock
    const App = require('./App').default;

    render(<App />);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Mode debug activé. Configuration actuelle :',
      expect.any(Object)
    );
  });
});
