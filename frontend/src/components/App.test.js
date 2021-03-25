import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders text search", () => {
  render(<App />);
  const searchElement = screen.getByText(/Select a username/i);
  expect(searchElement).toBeInTheDocument();
});
