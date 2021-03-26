import { render, screen } from "@testing-library/react";
import ErrorLabel from "./ErrorLabel";

test("alert, render error label", () => {
  render(<ErrorLabel error="This is an error" />);
  const foundByTextElement = screen.getByText("This is an error");
  expect(foundByTextElement).toBeInTheDocument();
});
