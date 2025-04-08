import { signInSchema } from "@/lib/auth-schema";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthValidity } from "@/lib/types";
import {
  fetchRefreshToken,
  authenticateUser,
  getDecodedToken,
  isValidToken,
} from "@/lib/auth.utils";
import { AuthorizationError, InvalidCredentialsError } from "@/lib/errors";

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

          const tokens = await authenticateUser(parsedCreds);

          try {
            const {
              exp: access_until,
              sub: user_id,
              email,
            } = await getDecodedToken(tokens.access);

            const { exp: refresh_until } = await getDecodedToken(
              tokens.refresh
            );

            const validity: AuthValidity = {
              access_until,
              refresh_until,
            };

            return {
              tokens,
              user: {
                id: user_id,
                email,
              },
              validity,
            };
          } catch (tokenError) {
            throw new AuthorizationError(
              "Invalid token structure in token payload: " + tokenError
            );
          }
        } catch (error) {
          console.error(error);

          if (error instanceof InvalidCredentialsError) {
            // Throw Invalid Credentials Error to user
            throw error;
          }

          // Fallback: don't show error to user
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user: authorizeReturn, account }) {
      // Initial signin -> attach `authorize` callback return data to token
      // For checking validity on subsequent requests + passing token to session
      if (authorizeReturn && account && account?.provider === "credentials") {
        return { ...token, data: authorizeReturn };
      }

      if (!token.data?.validity?.access_until) {
        console.debug("No validity information found in token");
        return token;
      }

      if (isValidToken(token.data.validity.access_until)) {
        console.debug("Access token is still valid");
        return token;
      }

      // REFRESH TOKEN
      if (isValidToken(token.data.validity.refresh_until)) {
        console.debug("Access token is being refreshed");
        try {
          const access = await fetchRefreshToken(token.data.tokens.refresh);
          token.data.tokens.access = access;

          const { exp } = await getDecodedToken(access);
          token.data.validity.access_until = exp;

          console.debug(
            "Successfully refreshed token, new expiry:",
            new Date(exp * 1000)
          );

          return { ...token };
        } catch (error) {
          console.error("Error refreshing token:", error);
          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }
      }

      // The current access token and refresh token have both expired
      // This should not really happen unless getting really unlucky with
      // the timing of the token expiration because the middleware should
      // have caught this case before the callback is called
      console.debug("Both tokens have expired");
      return null;
    },
    async session({ session, token }) {
      if (token.data) {
        session.user = token.data.user;
        session.accessToken = token.data.tokens.access;

        if (token.data.validity.access_until) {
          // @ts-expect-error - NextAuth typing expects a string but uses it as a Date internally
          session.expires = new Date(token.data.validity.access_until * 1000);
        }
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
