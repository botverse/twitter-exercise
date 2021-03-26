import { Form } from "reactstrap";
import { FormGroup, Input } from "reactstrap";

function UsernameSelector({ usernames, onChange, ...props }) {
  const onSelectChange = (event) => {
    if (!onChange) {
      return;
    }
    const input = event.target;
    onChange(input.options[input.selectedIndex].value);
  };
  return (
    <Form {...props}>
      <FormGroup>
        <Input
          type="select"
          name="username"
          role="username-selector"
          onChange={onSelectChange}
        >
          <option key="" value="">
            Select a username
          </option>
          {usernames.map((username) => {
            return (
              <option key={username} value={username.replace(/^@/, "")}>
                {username}
              </option>
            );
          })}
        </Input>
      </FormGroup>
    </Form>
  );
}

export default UsernameSelector;
