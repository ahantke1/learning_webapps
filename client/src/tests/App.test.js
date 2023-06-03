import { render, screen, fireEvent } from '@testing-library/react';
import App from '../app/App';
import '@testing-library/jest-dom';

test('Renders the Title', () => {
  render(<App />);
  const linkElement = screen.getByText(/The Reviewer/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders an input box for a name', () => {
  render(<App />);
  const linkElement = screen.getByTestId("name_input")
  expect(linkElement).toBeInTheDocument();
  fireEvent.change(linkElement, {target: {value: 'Good Day'}})
  expect(linkElement.value).toBe('Good Day')
});

test('Renders an input box for a review', () => {
  render(<App />);
  const linkElement = screen.getByTestId("review_input")
  expect(linkElement).toBeInTheDocument();
  fireEvent.change(linkElement, {target: {value: 'Good Day'}})
  expect(linkElement.value).toBe('Good Day')
});

test('Allows user to submit a review', () => {
  render(<App />);
  let linkElement = screen.getByTestId("name_input")
  fireEvent.change(linkElement, {target: {value: 'Test Name'}})

  linkElement = screen.getByTestId("review_input")
  fireEvent.change(linkElement, {target: {value: 'Test Review'}})
  
  linkElement = screen.getByTestId("submit")
  fireEvent.click(linkElement)

  // We can make this test better by mocking the server's resonse and then
  // asserting if the card componet renders with the values above
});