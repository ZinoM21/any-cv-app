// import NextAuth from "next-auth";
// import { authConfig } from "./config/auth.config";

export { auth as middleware } from "@/auth";

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import { auth } from "./auth";

// export default auth(async (req) => {
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });
//   const baseUrl = req.nextUrl.origin;

//   // Catch all requests to /dashboard and redirect to /
//   if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/signin", baseUrl));
//   }

// // Check if refresh token is present but expired
// // (all other token cases are handled in auth.config.ts)
// if (token && Date.now() >= token.data.validity.refresh_until * 1000) {
//   const response = NextResponse.redirect(new URL("/signin", baseUrl));
//   response.cookies.delete("authjs.session-token");
//   response.cookies.delete("authjs.csrf-token");

//   return response;
// }

//   // If authenticated, continue with the request
//   return NextResponse.next();
// });
