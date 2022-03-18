import React, { createContext, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import useAxiosWrapper from "../utils/axios";
import Cookies from "js-cookie";

const MainContext = createContext();

const ContextProvider = ({ children }) => {
  const router = useRouter();
  const { axios } = useAxiosWrapper();
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const login = async (formData) => {
    try {
      const { data } = await axios.post("/api/user/login", formData);
      Cookie.set("Authorization", data.token);
      setError({ ...error, error: false, message: "" });
      router.push("/");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        const {
          response: {
            data: { message },
          },
        } = error;
        setError({ ...error, error: true, message });
      } else {
        setError({ ...error, error: true, message: "Server Error" });
      }
    }
  };

  const register = async (formData) => {
    try {
      console.log("jeje");
      const { data } = await axios.post("/api/user/register", formData);
      Cookie.set("Authorization", data.token);
      setError({ ...error, error: false, message: "" });
      router.push("/verify");
    } catch (error) {
      if (error.response?.data?.message) {
        const {
          response: {
            data: { message },
          },
        } = error;
        setError({ ...error, error: true, message });
      } else {
        setError({ ...error, error: true, message: "Server Error" });
      }
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/api/user/current-user", {
        headers: {
          Authorization: "Bearer " + Cookies.get("Authorization"),
        },
      });

      setCurrentUser({
        id: data.id,
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        activated: data.activated,
      });

      setError({ ...error, error: false, message: "" });
    } catch (error) {
      if (error.response?.data?.message) {
        const {
          response: {
            data: { message },
          },
        } = error;
        setError({ ...error, error: true, message });
      } else {
        setError({ ...error, error: true, message: "Server Error" });
      }
    }
  };

  const confirmToken = async (id) => {
    try {
      await axios.get(`/api/user/confirm?token=${id}`);
      setCurrentUser({ ...currentUser, enabled: true });
      setError({ ...error, error: false, message: "" });
    } catch (error) {
      if (error.response?.data?.message) {
        const {
          response: {
            data: { message },
          },
        } = error;
        setError({ ...error, error: true, message });
      } else {
        setError({ ...error, error: true, message: "Server Error" });
      }
      router.push("/verify");
    }
  };

  const logout = () => {
    Cookie.remove("Authorization");
    router.push("/login").then(() => {
      setCurrentUser({});
    });
  };

  return (
    <MainContext.Provider
      value={{
        currentUser,
        error,
        login,
        register,
        getCurrentUser,
        confirmToken,
        logout,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, ContextProvider };
