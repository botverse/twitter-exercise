import { Alert } from "reactstrap";

function ErrorLabel(props) {
  if (!props.error) {
    return null;
  }

  return (
    <Alert role="error-label" color="danger">
      {props.error}
    </Alert>
  );
}

export default ErrorLabel;
