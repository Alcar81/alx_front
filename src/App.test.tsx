import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

test('renders main container or maintenance mode', () => {
  act(() => {
    // Rendre le composant App
    render(<App />);
  });

  // Vérifier si on est en mode maintenance
  const isMaintenanceMode =
    process.env.REACT_APP_MAINTENANCE_MODE === 'true' || false;

  if (isMaintenanceMode) {
    // Vérifier la présence de l'élément pour le mode maintenance
    const maintenanceElement = screen.getByTestId('maintenance-mode');
    expect(maintenanceElement).toBeInTheDocument();
  } else {
    // Vérifier la présence de l'élément pour le mode normal
    const mainContainer = screen.getByTestId('main-container');
    expect(mainContainer).toBeInTheDocument();
  }
});
