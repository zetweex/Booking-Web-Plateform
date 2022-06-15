import { render, screen } from '@testing-library/react';
import App from './App';

test('renders fleepi', () => {
  render(<App />);
  const linkElement = screen.getByText(/Connexion/i);
  expect(linkElement).toBeInTheDocument();
});
