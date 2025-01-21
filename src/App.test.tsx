import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import config from './config/config';

// Mockez les sous-composants pour éviter des problèmes avec leurs dépendances
jest.mock('./components/pages/Maintenance/Maintenance', () => {
  return () => <div data-testid="maintenance-mode">Maintenance Mode</div>;
});

jest.mock('./components/Layout/Layout', () => {
  return () => <div data-testid="main-layout">Main Layout</div>;
});

jest.mock('./config/config', () => ({
  REACT_APP_API_URL: 'https://api.example.com',
  REACT_APP_FRONTEND_URL: 'https://frontend.example.com',
  REACT_APP_WEBSITE_NAME: 'AlxMultimedia',
  REACT_APP_MAINTENANCE_MODE: false,
  REACT_APP_ENABLE_DEBUG: false,
}));

describe('App Component', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeAll(() => {
    // Mock console.error et console.log une seule fois avant tous les tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restaurer les mocks une fois après tous les tests
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  test('renders Maintenance page when maintenance mode is active', () => {
    // Simulez le mode maintenance
    (config.REACT_APP_MAINTENANCE_MODE as boolean) = true;

    render(<App />);

    const maintenanceElement = screen.getByTestId('maintenance-mode');
    expect(maintenanceElement).toBeInTheDocument();
  });

  test('renders Layout when maintenance mode is inactive', () => {
    // Simulez un mode normal
    (config.REACT_APP_MAINTENANCE_MODE as boolean) = false;

    render(<App />);

    const layoutElement = screen.getByTestId('main-layout');
    expect(layoutElement).toBeInTheDocument();
  });

  test('validates required configuration keys', () => {
    // Réinitialisez le mock pour ce test
    consoleErrorSpy.mockClear();

    // Simulez l'absence d'une configuration essentielle
    (config.REACT_APP_API_URL as string | undefined) = undefined;

    render(<App />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("REACT_APP_API_URL n'est pas défini dans le fichier .env ou config.ts")
    );
  });

  test('outputs debug information when debug mode is enabled', () => {
    // Réinitialisez le mock pour ce test
    consoleLogSpy.mockClear();

    (config.REACT_APP_ENABLE_DEBUG as boolean) = true;

    render(<App />);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Mode debug activé. Configuration actuelle :',
      expect.any(Object)
    );
  });
});
