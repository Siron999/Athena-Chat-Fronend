import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import AuthButton from "../../components/authButton";
import axios from "../../utils/axios";
import { Store } from "react-notifications-component";
import { MainContext } from "../../context/MainContext";
import Cookie from "js-cookie";

const Verify = ({ verificationError }) => {
  const { currentUser, getCurrentUser } = useContext(MainContext);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (Cookie.get("Authorization") && currentUser.activated) {
      router.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(verificationError+"lol")
    if (verificationError) {
      Store.addNotification({
        title: "Verification Failed",
        message: "Please try again later",
        type: "danger",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: false,
        },
      });
    }
  }, [verificationError]);

  return (
    <>
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
              Verify Your Athena Account
            </h3>
            <p className="text-center" style={{ marginTop: "50px" }}>
              The verification link has been sent to your email.
            </p>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Verify;
