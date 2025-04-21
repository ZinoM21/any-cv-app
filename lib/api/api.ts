import { notFound, redirect } from "next/navigation";
import { ApiError } from "../errors";
import {
  SignInFormValues,
  type SignUpFormValues
} from "../schemas/auth-schema";
import {
  ProfileData,
  Tokens,
  type AccessResponse,
  type ImageUrl,
  type PublishingOptions,
  type User
} from "../types";
import { createApiClient, type ApiRequestOptions } from "./api-client";
import { getServerApi } from "./server-api";

/**
 * Fetches a list of published profiles from the API.
 * This is used for pre-rendering top profiles in generateStaticParams.
 *
 * @returns Array of published profiles
 */
export async function getPublishedProfiles() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/published`
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
 * @param slug The slug of the profile to fetch
 * @param redirectTo The URL to redirect to if the profile is not found
 * @returns The fetched profile data
 */
export async function getPublishedProfileOrRedirect(
  slug: string,
  redirectTo: string = "/"
): Promise<ProfileData> {
  const serverApi = await getServerApi();
  try {
    return await serverApi.get<ProfileData>(`/v1/profile/published/${slug}`);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        notFound();
      }
      redirect(redirectTo);
    }
    throw error;
  }
}

/**
 * Fetches profile data for a username, or redirects to home if an error occurs
 *
 * @param username LinkedIn username to fetch profile for
 * @returns ProfileData if successful, or redirects to home
 */
export async function getProfileDataOrRedirect(
  username: string,
  redirectTo: string = "/"
): Promise<ProfileData> {
  const serverApi = await getServerApi();
  try {
    return await serverApi.get<ProfileData>(`/v1/profile/${username}`);
  } catch (error) {
    if (error instanceof ApiError) {
      redirect(redirectTo);
    }
    throw error;
  }
}

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
  return await api.post<Tokens>("/v1/auth/login", parsedCreds);
};

export const registerUser = async (
  api: ReturnType<typeof createApiClient>,
  credentials: SignUpFormValues
): Promise<User> => {
  return await api.post<User>("/v1/auth/register", credentials);
};

/**
 * Fetches a new access token from the backend using the refresh token
 *
 * @param refreshToken Refresh token to use for fetching a new access token
 * @returns New access token
 */
export const getNewAccessToken = async (
  refreshToken: string
): Promise<string> => {
  const api = createApiClient();

  const refreshResponse = await api.post<AccessResponse>(
    "/v1/auth/refresh-access",
    {
      refresh_token: refreshToken
    }
  );

  return refreshResponse.access;
};

export const transferProfileFromCacheToUser = async (
  api: ReturnType<typeof createApiClient>,
  username: string
) => {
  return await api.get<ProfileData>(`/v1/profile/${username}/transfer`);
};

/**
 * Fetches a list of profiles of the authenticated user from the API.
 *
 * @returns Array of user profiles
 */
export const getUserProfiles = async (
  api: ReturnType<typeof createApiClient>,
  options: ApiRequestOptions = {}
): Promise<ProfileData[]> => {
  return await api.get<ProfileData[]>("/v1/profile/user/list", options);
};

export const createProfileFromRemoteData = async (
  api: ReturnType<typeof createApiClient>,
  username: string
) => {
  return await api.post<ProfileData>(`/v1/profile/${username}`);
};

export const updateProfile = async (
  api: ReturnType<typeof createApiClient>,
  username: string,
  data: Partial<ProfileData>
) => {
  return await api.patch<ProfileData>(`/v1/profile/${username}`, data);
};

export const publishProfile = async (
  api: ReturnType<typeof createApiClient>,
  username: string,
  data: PublishingOptions
) => {
  return await api.patch<ProfileData>(`/v1/profile/${username}/publish`, data);
};

export const unpublishProfile = async (
  api: ReturnType<typeof createApiClient>,
  username: string
) => {
  return await api.patch<ProfileData>(`/v1/profile/${username}/unpublish`);
};

export const getSignedUrl = async (
  api: ReturnType<typeof createApiClient>,
  filePath: string
) => {
  try {
    const res = await api.post<ImageUrl>(`/v1/files/signed-url`, {
      file_path: filePath
    });

    return res;
  } catch (error) {
    console.error("Failed to get signed url for file: ", filePath, error);
    throw error;
  }
};

/**
 * Gets a public URL for a file associated with a published profile
 *
 * @param api The API client to use
 * @param slug The slug of the published profile
 * @param filePath The path of the file in storage
 * @returns SignedUrl containing the public URL
 */
export const getPublicUrl = async (
  api: ReturnType<typeof createApiClient>,
  slug: string,
  filePath: string
): Promise<ImageUrl> => {
  return await api.post<ImageUrl>(`/v1/files/public/${slug}`, {
    file_path: filePath
  });
};

export const getSignedUploadUrl = async (
  api: ReturnType<typeof createApiClient>,
  file: File
) => {
  return await api.post<ImageUrl>(`/v1/files/signed-upload-url`, {
    file_name: file.name,
    file_type: file.type,
    file_size: file.size
  });
};

export const uploadFileToSignedUrl = async (url: string, file: File) => {
  const uploadResponse = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type
    },
    body: file
  });

  const data = await uploadResponse.json();

  if (!uploadResponse.ok) {
    const errMessage =
      "Failed to upload file: " +
      (data.detail ||
        data.message ||
        data.error ||
        data ||
        uploadResponse.statusText);
    console.error(errMessage);
    throw new Error(errMessage);
  }

  return data;
};

/**
 * Deletes a profile by username
 *
 * @param api The API client to use
 * @param username The username of the profile to delete
 * @returns The response from the delete request
 */
export const deleteProfile = async (
  api: ReturnType<typeof createApiClient>,
  username: string
) => {
  return await api.delete<void>(`/v1/profile/${username}`);
};
