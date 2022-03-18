import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, Container } from "reactstrap";
import AuthButton from "../../components/authButton";
import axios from "axios";
import { Store } from "react-notifications-component";
import { MainContext } from "../../context/MainContext";
import Cookie from "js-cookie";

const Verified = () => {
  const { currentUser } = useContext(MainContext);
  const router = useRouter();

  useEffect(() => {
    if (Cookie.get("Authorization") && currentUser.activated) {
      router.push("/");
    } else {
      setTimeout(() => {
        router.push("/");
      }, 4000);
    }
  }, [currentUser]);

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
              Congrats!
            </h3>
            <p className="text-center" style={{ marginTop: "50px" }}>
              Your account has been verified. Redirecting to Athena Chat...
            </p>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Verified;

export const getServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.params;
    await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/confirm?token=${id}`
    );
    return {
      props: {},
    };
  } catch (error) {
    let errorMsg;
    if (error.response?.data?.message) {
      const {
        response: {
          data: { message },
        },
      } = error;
      errorMsg = message;
    } else {
      errorMsg = "Please try again later";
    }
    return {
      props: {
        error: {
          title: "Verification Error",
          message: errorMsg,
        },
      },
    };
  }
};
