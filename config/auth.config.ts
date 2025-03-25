import { signInSchema } from "@/lib/auth-schema";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { AuthValidity, Tokens } from "@/lib/types";

import * as jose from "jose";

const encodedSecret = new TextEncoder().encode(process.env.AUTH_SECRET);

export const authConfig: NextAuthConfig = {
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
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

          const tokens: Tokens = await response.json();

          if (!tokens) {
            return null;
          }

          const { payload: decodedAccessToken } = await jose.jwtVerify(
            tokens.access,
            encodedSecret
          );
          const { payload: decodedRefreshToken } = await jose.jwtVerify(
            tokens.refresh,
            encodedSecret
          );

          if (
            !(
              decodedAccessToken.sub ||
              decodedAccessToken.email ||
              decodedAccessToken.username
            ) ||
            !(
              decodedRefreshToken.sub ||
              decodedRefreshToken.email ||
              decodedRefreshToken.username
            )
          ) {
            throw new Error("Invalid tokens: Expected DecodedToken type.");
          }

          const validity: AuthValidity = {
            access_until: decodedAccessToken.exp,
            refresh_until: decodedRefreshToken.exp,
          };

          return {
            tokens,
            user: {
              id: decodedAccessToken.sub as string,
              email: decodedAccessToken.email as string,
              username: decodedAccessToken.username as string,
            },
            validity,
          };
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
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        // Pass accessToken to token for later use in session
        token.accessToken = user.tokens.access;
      }

      // Initial signin -> attach authorize callbacks return data to token
      if (user && account) {
        return { ...token, data: user };
      }

      if (Date.now() < token.data.validity.access_until * 1000) {
        console.debug("Access token is still valid");
        return token;
      }

      if (Date.now() < token.data.validity.refresh_until * 1000) {
        console.debug("Access token is being refreshed");
        try {
          // Get a new access token from backend using the refresh token
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh-access`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refresh_token: token.data.tokens.refresh,
              }),
            }
          );

          const { access } = await response.json();

          if (!response.ok) {
            throw access;
          }

          const {
            payload: { exp },
          } = await jose.jwtVerify(access, encodedSecret);

          // Update token and validity
          token.data.validity.access_until = exp;
          token.data.tokens.access = access;

          // Clone object to ensure it has a new id
          return { ...token };
        } catch (error) {
          console.debug(error);
          return {
            ...token,
          };
        }
      }

      return { ...token };
    },
    async session({ session, token }) {
      if (token.data) {
        session.user = token.data.user;
        session.validity = token.data.validity;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    redirect({ url }) {
      // Have to specify redirect here because default does not handle it
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
};
