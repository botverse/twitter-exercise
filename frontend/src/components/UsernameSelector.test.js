import { render, screen } from "@testing-library/react";
import UsernameSelector from "./UsernameSelector";

test("onChange", () => {
  let val = null;
  const onChange = (newVal) => {
    val = newVal;
  };
  render(
    <UsernameSelector
      usernames={["@alice", "@cheshirecat", "@tweedledee"]}
      onChange={onChange}
    />
  );
  const selectElement = screen.getByRole("username-selector");

  // offset by 1, first option is the placeholder
  selectElement.selectedIndex = 2;
  selectElement.dispatchEvent(
    new Event("change", { target: selectElement, bubbles: true })
  );

  expect(val).toBe("cheshirecat");
});
