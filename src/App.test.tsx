import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main container', () => {
  render(<App />);
  const mainContainer = screen.getByTestId('main-container');
  expect(mainContainer).toBeInTheDocument();
});