import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth(async (req) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const baseUrl = req.nextUrl.origin;

  // Check if refresh token is present but expired
  // (all other cases are handled in auth.config.ts)
  if (token && Date.now() >= token.data.validity.refresh_until * 1000) {
    const response = NextResponse.redirect(`${baseUrl}/signin`);
    response.cookies.set("authjs.session-token", "", { maxAge: 0 });
    response.cookies.set("authjs.csrf-token", "", { maxAge: 0 });

    return response;
  }

  // If authenticated, continue with the request
  return NextResponse.next();
});
