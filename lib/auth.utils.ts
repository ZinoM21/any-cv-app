import * as jose from "jose";
import { AccessResponse, DecodedToken, Tokens } from "./types";
import {
  ApiError,
  AuthorizationError,
  InvalidCredentialsError,
} from "@/lib/errors";
import { SignInFormValues } from "./auth-schema";
import { createApiClient } from "./api-client";

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
  const api = createApiClient();
  try {
    const tokens = await api.post<Tokens>("/v1/auth/login", parsedCreds);

    if (!tokens || !tokens.access || !tokens.refresh) {
      throw new AuthorizationError(
        "Invalid response from authentication service"
      );
    }

    return tokens;
  } catch (error) {
    if (error instanceof ApiError) {
      // Catch all API errors
      if (error.status === 401 || error.status === 404) {
        throw new InvalidCredentialsError();
      }
    }

    if (error instanceof AuthorizationError) {
      // Catch invalid return values from the API
      throw error;
    }

    // Catch rest
    throw new AuthorizationError(
      `Request failed${
        error instanceof ApiError &&
        " with status: " + error.status + " :" + error.message
      }`
    );
  }
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
  const api = createApiClient();

  try {
    const refreshResponse = await api.post<AccessResponse>(
      "/v1/auth/refresh-access",
      {
        refresh_token: refreshToken,
      }
    );

    const { access } = refreshResponse;

    if (!access) {
      console.error("No access token received:", refreshResponse);
      throw new Error("Invalid response format from refresh endpoint");
    }

    return access;
  } catch (error) {
    if (error instanceof AuthorizationError) {
      // Catch invalid return values from the API
      throw error;
    }

    const status = error instanceof ApiError ? error.status : undefined;
    const errorMessage =
      error instanceof ApiError ? status + ": " + error.message : error;

    // Catch rest
    throw new AuthorizationError(`Request failed: ${errorMessage}`, status);
  }
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
