import { render, screen } from "@testing-library/react";
import Tweet from "./Tweet";

test("Tweets", () => {
  const tweet = {
    id_str: "2",
    user: {
      profile_image_url: "http://example.com/avatar.png",
      screen_name: "alice",
      name: "Alice in Wonderland",
    },
    full_text: "First tweet",
    entities: {},
  };
  render(<Tweet tweet={tweet} />);

  let found = screen.getByText("@alice");
  expect(found).toBeInTheDocument();

  found = screen.getByText("First tweet");
  expect(found).toBeInTheDocument();
});
