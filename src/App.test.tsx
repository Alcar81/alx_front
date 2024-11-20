import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main container or maintenance mode', () => {
  render(<App />);

  const isMaintenanceMode = process.env.REACT_APP_MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    const maintenanceElement = screen.getByTestId('maintenance-mode');
    expect(maintenanceElement).toBeInTheDocument();
  } else {
    const mainContainer = screen.getByTestId('main-container');
    expect(mainContainer).toBeInTheDocument();
  }
});
