export { auth as middleware } from "@/auth";

// import { getToken } from "next-auth/jwt";
// import { auth } from "./auth";
// import { NextResponse } from "next/server";

// export default auth(async (req) => {
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });
//   const baseUrl = req.nextUrl.origin;

//   // Check if the user is authenticated
//   if (
//     !token ||
//     (token && Date.now() >= token.data.validity.refresh_until * 1000)
//   ) {
//     // Redirect to the login page
//     const response = NextResponse.redirect(`${baseUrl}/signin`);
//     // Clear the session cookies
//     response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
//     response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });

//     return response;
//   }

//   // If authenticated, continue with the request
//   return NextResponse.next();
// });

// // Optionally, don't invoke Middleware on some paths
// // Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = {
//   matcher: ["/((?!signin|public|_next/static|_next/image|favicon.ico).*)"],
// };
