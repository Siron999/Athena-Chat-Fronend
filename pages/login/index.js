import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import AuthButton from "../../components/authButton";
import axios from "../../utils/axios";
import { Store } from "react-notifications-component";
import { MainContext } from "../../context/MainContext";
import Cookie from "js-cookie";

const Login = () => {
  const { login, error } = useContext(MainContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    login(formData);
    setLoading(false);
  };

  useEffect(() => {
    if (error.error) {
      Store.addNotification({
        title: "Login Failed",
        message: error.message,
        type: "danger",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: false,
        },
      });
    }
  }, [error]);

  useEffect(() => {
    if (Cookie.get("Authorization")) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Container
        style={{ height: "89vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Card style={{ width: "30%", height: "90%" }} className="mt-3">
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
              Login
            </h3>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Username: </Label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password: </Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <AuthButton disabled={loading}>Login</AuthButton>
            </Form>
            <p className="text-center" style={{ marginTop: "150px" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "#2697FF", cursor: "pointer" }}
                onClick={() => {
                  console.log("push");
                  router.push("/register");
                }}
              >
                Sign up now
              </span>
            </p>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Login;
