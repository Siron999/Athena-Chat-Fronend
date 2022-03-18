import React from "react";
import { FormGroup, Button } from "reactstrap";

const AuthButton = (props) => {
  return (
    <FormGroup>
      <Button
        {...props}
        color="primary"
        block
        className="mt-5 auth-button"
        type="submit"
      >
        {props.disabled ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          props.children
        )}
      </Button>
    </FormGroup>
  );
};

export default AuthButton;
