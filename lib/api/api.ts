import {
  ApiError,
  AuthorizationError,
  InvalidCredentialsError,
} from "@/lib/errors";
import { redirect } from "next/navigation";
import { SignInFormValues } from "../schemas/auth-schema";
import { ProfileData, Tokens, type AccessResponse } from "../types";
import { createApiClient, type ApiRequestOptions } from "./api-client";

/**
 * Fetches a list of published profiles from the API.
 * This is used for pre-rendering top profiles in generateStaticParams.
 *
 * @returns Array of published profiles
 */
export async function getPublishedProfiles() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/published`,
    );
    const data: ProfileData[] = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch published profiles:", error);
    return [];
  }
}

/**
 * Fetches a single published profile from the API and redirects to a given URL if the profile is not found.
 *
 * @param username The username of the profile to fetch
 * @param redirectTo The URL to redirect to if the profile is not found
 * @returns The fetched profile data
 */
export async function getPublishedProfileOrRedirect(
  username: string,
  redirectTo: string = "/",
): Promise<ProfileData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/published/${username}`,
    );
    if (!res.ok) {
      redirect(redirectTo);
    }
    const data: ProfileData = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch published profile:", error);
    redirect(redirectTo);
  }
}

/**
 * Authenticates a user and returns a new access and refresh token
 *
 * @param parsedCreds Credentials to use for authenticating a user
 * @returns New access and refresh tokens
 */
export const authenticateUser = async (
  parsedCreds: SignInFormValues,
): Promise<Tokens> => {
  const api = createApiClient();
  try {
    const tokens = await api.post<Tokens>("/v1/auth/login", parsedCreds);

    if (!tokens || !tokens.access || !tokens.refresh) {
      throw new AuthorizationError(
        "Invalid response from authentication service",
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
      }`,
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
  refreshToken: string,
): Promise<string> => {
  const api = createApiClient();

  try {
    const refreshResponse = await api.post<AccessResponse>(
      "/v1/auth/refresh-access",
      {
        refresh_token: refreshToken,
      },
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

/**
 * Fetches a list of profiles of the authenticated user from the API.
 *
 * @returns Array of user profiles
 */
export const getUserProfiles = async (
  api: ReturnType<typeof createApiClient>,
  options: ApiRequestOptions = {},
): Promise<ProfileData[]> => {
  return await api.get<ProfileData[]>("/v1/profile/user/list", options);
};

export const createProfileFromRemoteData = async (
  api: ReturnType<typeof createApiClient>,
  username: string,
) => {
  return api.post<ProfileData>(`/v1/profile/${username}`);
};
