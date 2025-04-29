import { Session as DefaultSession, type User as DefaultUser } from "next-auth";
import { type JWT as DefaultJWT } from "next-auth/jwt";
import {
  AuthValidity,
  SignInOptions,
  Tokens,
  type User as UserObject
} from "./types";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {
    tokens: Tokens;
    user: UserObject;
    validity: AuthValidity;
  }

  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: User;
    validity: AuthValidity;
    accessToken: string;
    error: string | undefined;
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
    error: string | undefined;
  }
}

/**
 * Type definition for the auth hook return value.
 */
interface UseAuthReturn {
  /**
   * Signs in a user with the provided credentials
   */
  signIn: (
    credentials?: SignInFormValues,
    options?: SignInOptions
  ) => Promise<void>;

  /**
   * Imitates the `signIn` function from next-auth, just for sign up.
   * Call it without params to just redirect to /signup page.
   * Call it with credentials and it will attempt to sign up the user.
   * @param credentials - The user signup credentials
   * @param options - Additional options for signup process
   * @returns A promise that resolves when signup is complete
   */
  signUp: (
    credentials?: SignUpFormValues,
    options?: SignInOptions
  ) => Promise<void>;

  /**
   * Whether authentication is in progress
   */
  isLoading: boolean;

  /**
   * Error message if authentication failed
   */
  error: string | undefined;
}
