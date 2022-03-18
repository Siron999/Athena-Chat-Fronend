import React from "react";
import { Container, Card, CardBody } from "reactstrap";

const Error = ({ title, message }) => {
  return (
    <Container
      style={{ height: "89vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card style={{ width: "40%", height: "40%" }} className="mt-3">
        <CardBody
          style={{
            paddingRight: "50px",
            paddingLeft: "50px",
          }}
          className="pt-5"
        >
          <h3
            className="text-center mb-5"
            style={{
              fontWeight: 800,
            }}
          >
            {title}
          </h3>
          <p className="text-center" style={{ marginTop: "50px" }}>
            {message}
          </p>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Error;
