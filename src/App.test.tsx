import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from './App';
import config from './config/config'; // Assurez-vous que config est correctement importé

test('renders main container or maintenance mode', () => {
  act(() => {
    // Rendre le composant App
    render(<App />);
  });

  const isMaintenanceMode = config.REACT_APP_MAINTENANCE_MODE; // Utiliser la configuration directement

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
