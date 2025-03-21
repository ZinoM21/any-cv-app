import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./lib/auth-schema";

export const { handlers, auth, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
  },
  // session: {
  //   strategy: "database"

  // },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const parsedCreds = await signInSchema.parseAsync({
            email: credentials.email,
            password: credentials.password,
          });

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(parsedCreds),
            }
          );

          if (!response.ok) {
            return null;
          }

          const user = await response.json();

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Validation error:", error.errors);
            return null;
          }
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.userId = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId;
        session.user.username = token.username;
      }
      return session;
    },
    // Have to specify redirect here because default does not handle it
    redirect({ url }) {
      if (url.includes("callbackUrl")) {
        const params = new URLSearchParams(url.split("?")[1]);
        const callbackUrl = params.get("callbackUrl");
        if (callbackUrl) {
          const decodedUrl = decodeURIComponent(callbackUrl);
          return decodedUrl;
        }
      }
      return url;
    },
  },
} satisfies NextAuthConfig);
