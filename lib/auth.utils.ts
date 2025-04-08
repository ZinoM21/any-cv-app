import * as jose from "jose";
import { DecodedToken, Tokens } from "./types";
import { AuthorizationError, InvalidCredentialsError } from "@/lib/errors";
import { SignInFormValues } from "./auth-schema";

const encodedSecret = new TextEncoder().encode(process.env.AUTH_SECRET);
const EXPIRY_BUFFER_MS = 30 * 1000; // 30 sec

/**
 * Authenticates a user and returns a new access and refresh token
 *
 * @param parsedCreds Credentials to use for authenticating a user
 * @returns New access and refresh tokens
 */
export const authenticateUser = async (
  parsedCreds: SignInFormValues
): Promise<Tokens> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedCreds),
    }
  );

  if (!response.ok) {
    // Only handle 401/404 as InvalidCredentialsError, the rest as generic errors
    if (response.status === 401 || response.status === 404) {
      throw new InvalidCredentialsError();
    } else {
      throw new AuthorizationError(
        "Request failed with status: " + response.status
      );
    }
  }

  const tokens: Tokens = await response.json();

  if (!tokens || !tokens.access || !tokens.refresh) {
    throw new AuthorizationError(
      "Invalid response from authentication service"
    );
  }

  return tokens;
};

/**
 * Fetches a new access token from the backend using the refresh token
 *
 * @param refreshToken Refresh token to use for fetching a new access token
 * @returns New access token
 */
export const fetchRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh-access`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    }
  );

  if (!response.ok) {
    console.error(
      `Failed to refresh token: ${response.status}`,
      await response.text()
    );
    throw new Error(`Failed to refresh token: ${response.status}`);
  }

  const refreshResponse = await response.json();
  const { access } = refreshResponse;

  if (!access) {
    console.error("No access token received:", refreshResponse);
    throw new Error("Invalid response format from refresh endpoint");
  }

  return access;
};

export const getDecodedToken = async (token: string): Promise<DecodedToken> => {
  try {
    const { payload } = await jose.jwtVerify<DecodedToken>(
      token,
      encodedSecret
    );

    const { sub, exp, email, iat } = payload;

    if (!exp || !sub || !email || typeof email !== "string" || !iat) {
      throw new Error("Invalid token structure in token payload");
    }

    return payload;
  } catch (jwtError) {
    console.error("Error verifying JWT:", jwtError);
    throw jwtError;
  }
};

export const isValidToken = (exp: number | undefined): boolean => {
  if (!exp) return false;
  return Date.now() + EXPIRY_BUFFER_MS < exp * 1000;
};
