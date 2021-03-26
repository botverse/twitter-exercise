import { render, screen } from "@testing-library/react";
import LoadScroller from "./LoadScroller";

test("onScrolledTo", () => {
  let triggered = false;
  const onScrolledTo = () => {
    triggered = true;
  };
  render(<LoadScroller onScrolledTo={onScrolledTo} />);
  window.dispatchEvent(new Event("scroll"));
  expect(triggered).toBe(true);
});

test("loading", () => {
  render(<LoadScroller loading={true} />);
  const found = screen.getByRole("loading-spinner");
  expect(found).toBeInTheDocument();
});

test("not loading", () => {
  render(<LoadScroller loading={false} />);
  const found = screen.queryByRole("loading-spinner");
  expect(found).not.toBeInTheDocument();
});
