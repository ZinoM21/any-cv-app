/**
 * API client abstraction for making authenticated and non-authenticated requests
 * to the backend API.
 */

import { signOut as signOutServer } from "@/auth";
import { signOut as signOutClient } from "next-auth/react";
import type { SearchParams } from "next/dist/server/request/search-params";
import { ApiError } from "../errors";
import { buildQueryString } from "../utils";

export interface ApiRequestOptions extends RequestInit {
  token?: string;
  params?: URLSearchParams | SearchParams;
}

/**
 * Base URL for API requests
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Makes an API request with automatic authentication if token is provided.
 * Can be used for both client and server components.
 *
 * @param endpoint The API endpoint path (without base URL)
 * @param options Request options including optional auth token
 * @returns Parsed JSON response
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { token, params, ...fetchOptions } = options;

  // URL
  const url = `${API_BASE_URL}${endpoint}?${
    params && buildQueryString(params)
  }`;

  // Headers
  const headers = new Headers(fetchOptions.headers);

  if (fetchOptions.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Request
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Error
    if (!response.ok) {
      let errorMessage: string;
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.detail ||
          errorData.message ||
          `API error: ${response.status}`;
      } catch {
        errorMessage = `API error: ${response.status}`;
      }

      throw new ApiError(errorMessage, response.status);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError && error.message.includes("expired")) {
      if (typeof window !== "undefined") {
        signOutClient({ redirectTo: "/" });
      } else {
        signOutServer({ redirectTo: "/" });
      }
    }
    if (error instanceof ApiError) {
      throw error;
    }
    console.error("Failed to fetch", error);
    throw new ApiError("Failed to fetch", 500);
  }
}

/**
 * Create an API client instance that includes the provided auth token in all requests
 *
 * @param token Authentication token to include in requests
 * @returns API client methods with authentication
 */
export function createApiClient(token?: string) {
  return {
    /**
     * Send a GET request to the API
     */
    get: <T>(endpoint: string, options: ApiRequestOptions = {}) =>
      apiRequest<T>(endpoint, {
        ...options,
        method: "GET",
        token: options.token || token,
      }),

    /**
     * Send a POST request to the API
     */
    post: <T>(
      endpoint: string,
      data?: unknown,
      options: ApiRequestOptions = {}
    ) =>
      apiRequest<T>(endpoint, {
        ...options,
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
        token: options.token || token,
      }),

    /**
     * Send a PATCH request to the API
     */
    patch: <T>(
      endpoint: string,
      data?: unknown,
      options: ApiRequestOptions = {}
    ) =>
      apiRequest<T>(endpoint, {
        ...options,
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
        token: options.token || token,
      }),

    /**
     * Send a PUT request to the API
     */
    put: <T>(
      endpoint: string,
      data?: unknown,
      options: ApiRequestOptions = {}
    ) =>
      apiRequest<T>(endpoint, {
        ...options,
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
        token: options.token || token,
      }),

    /**
     * Send a DELETE request to the API
     */
    delete: <T>(endpoint: string, options: ApiRequestOptions = {}) =>
      apiRequest<T>(endpoint, {
        ...options,
        method: "DELETE",
        token: options.token || token,
      }),
  };
}
