import React from 'react';
import { render, screen } from '@testing-library/react';
import Lista from './Lista';

test('renders Lista component', () => {
  render(<Lista />);
  const headingElement = screen.getByText(/Lista Zadań/i);
  expect(headingElement).toBeInTheDocument();
});