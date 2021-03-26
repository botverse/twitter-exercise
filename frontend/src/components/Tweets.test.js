import { render, screen } from "@testing-library/react";
import Tweets from "./Tweets";

test("Tweets", () => {
  const tweets = [
    {
      id_str: "2",
      user: {
        profile_image_url: "http://example.com/avatar.png",
        screen_name: "alice",
        name: "Alice in Wonderland",
      },
      full_text: "First tweet",
      entities: {},
    },
    {
      id_str: "1",
      user: {
        profile_image_url: "http://example.com/avatar.png",
        screen_name: "alice",
        name: "Alice in Wonderland",
      },
      full_text: "Second tweet",
      entities: {},
    },
  ];
  render(<Tweets tweets={tweets} />);

  let found = screen.getAllByText("@alice");
  expect(found.length).toBe(2);

  found = screen.getByText("First tweet");
  expect(found).toBeInTheDocument();
  found = screen.getByText("Second tweet");
  expect(found).toBeInTheDocument();
});
