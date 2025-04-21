import { authenticateUser, getNewAccessToken } from "@/lib/api";
import { InvalidCredentialsError } from "@/lib/errors";
import { signInSchema } from "@/lib/schemas/auth-schema";
import { AuthValidity } from "@/lib/types";
import { getDecodedToken, isValidToken } from "@/lib/utils";
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signin"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const parsedCreds = await signInSchema.parseAsync({
            email: credentials.email,
            password: credentials.password
          });

          const tokens = await authenticateUser(parsedCreds);

          const {
            exp: access_until,
            sub: user_id,
            email
          } = await getDecodedToken(tokens.access);

          const { exp: refresh_until } = await getDecodedToken(tokens.refresh);

          const validity: AuthValidity = {
            access_until,
            refresh_until
          };

          return {
            tokens,
            user: {
              id: user_id,
              email
            },
            validity
          };
        } catch (error) {
          console.error(error);

          if (error instanceof InvalidCredentialsError) {
            // Throw Invalid Credentials Error to user
            throw error;
          }

          // Fallback: don't show other errors to user
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user: authorizeReturn, account }) {
      // Initial signin -> attach `authorize` callback return data to token.
      // This is used for checking validity on subsequent requests + passing token to client session
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
          const access = await getNewAccessToken(token.data.tokens.refresh);
          const { exp } = await getDecodedToken(access);
          console.debug(
            "Successfully refreshed token, new expiry:",
            new Date(exp * 1000)
          );

          return {
            ...token,
            data: {
              ...token.data,
              tokens: { ...token.data.tokens, access },
              validity: { ...token.data.validity, access_until: exp }
            }
          };
        } catch (error) {
          console.error("Error refreshing token:", error);
          return {
            ...token,
            error: "RefreshAccessTokenError" // Error has to be handled on pages
          };
        }
      }

      // This case is caught by the middleware in SSR and by the api-client in client components
      console.debug("Both tokens have expired");
      return null;
    },
    async session({ session, token }) {
      session.error = token.error;

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
      // Have to specify redirect here because default does not handle it properly
      if (url.includes("callbackUrl")) {
        const params = new URLSearchParams(url.split("?")[1]);
        const callbackUrl = params.get("callbackUrl");
        if (callbackUrl) {
          const decodedUrl = decodeURIComponent(callbackUrl);
          return decodedUrl;
        }
      }
      return url;
    }
  }
};
