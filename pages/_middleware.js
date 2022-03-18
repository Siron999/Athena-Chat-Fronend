import { NextResponse } from "next/server";

export default function middleware(req) {
  const { url } = req;
  const regex = /\/verify\/[A-Za-z0-9]+$/;
  if (
    !(
      url.includes("/login") ||
      url.includes("/register") ||
      regex.test(url) ||
      url.includes("/favicon.ico")
    )
  ) {
    const {
      cookies: { Authorization: token },
    } = req;

    if (!token) {
      return NextResponse.redirect("http://localhost:3000/login");
    }
  }

  return NextResponse.next();
}
