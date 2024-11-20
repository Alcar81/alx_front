import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main container or maintenance mode', () => {
  // Définir une valeur par défaut pour l'environnement de test
  const isMaintenanceMode =
    process.env.REACT_APP_MAINTENANCE_MODE === 'true' || false;

  render(<App />);

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
