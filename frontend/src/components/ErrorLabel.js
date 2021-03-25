import { Alert } from "reactstrap";

function ErrorLabel(props) {
  if (!props.error) {
    return null;
  }

  return (
    <Alert data-testid="test-error-label" color="danger">
      {props.error}
    </Alert>
  );
}

export default ErrorLabel;
