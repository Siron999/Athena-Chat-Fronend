import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthButton from "../components/authButton";
import { MainContext } from "../context/MainContext";

export default function Home() {
  const { currentUser, getCurrentUser, logout } = useContext(MainContext);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded && !currentUser.activated) {
      router.push("/verify");
    }
  }, [currentUser, loaded]);

  return (
    <div>
      <h1>Home</h1>
      <p>{currentUser.username}</p>
      <p>{currentUser.email}</p>
      <p>{currentUser.mobileNumber}</p>
      <Link href="/login">Login</Link>
      <AuthButton onClick={logout}>Logout</AuthButton>
    </div>
  );
}
