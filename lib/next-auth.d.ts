// eslint-disable-next-line
import NextAuth, {
  type User as DefaultUser,
  Session as DefaultSession,
} from "next-auth";
import { type JWT as DefaultJWT } from "next-auth/jwt";
import { AuthValidity, Tokens, type User as UserObject } from "./types";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: User;
    validity: AuthValidity;
    accessToken: string;
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {
    tokens: Tokens;
    user: UserObject;
    validity: AuthValidity;
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback when using JWT sessions
   *
   * [`jwt` callback](https://authjs.dev/reference/core/types#jwt)
   */
  interface JWT extends DefaultJWT {
    data: User;
    accessToken: string;
  }
}
