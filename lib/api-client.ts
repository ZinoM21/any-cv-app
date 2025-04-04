/**
 * API client abstraction for making authenticated and non-authenticated requests
 * to the backend API.
 */

import { Session } from "next-auth";

export interface ApiRequestOptions extends RequestInit {
  token?: string;
  params?: Record<string, string>;
}

/**
 * Base URL for API requests
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Custom API error type
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

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
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Headers
  const headers = new Headers(fetchOptions.headers);

  if (fetchOptions.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Request
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
    get: <T>(
      endpoint: string,
      options: Omit<ApiRequestOptions, "token"> = {}
    ) => apiRequest<T>(endpoint, { ...options, method: "GET", token }),

    /**
     * Send a POST request to the API
     */
    post: <T>(
      endpoint: string,
      data?: unknown,
      options: Omit<ApiRequestOptions, "token"> = {}
    ) =>
      apiRequest<T>(endpoint, {
        ...options,
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
        token,
      }),

    /**
     * Send a PATCH request to the API
     */
    patch: <T>(
      endpoint: string,
      data?: unknown,
      options: Omit<ApiRequestOptions, "token"> = {}
    ) =>
      apiRequest<T>(endpoint, {
        ...options,
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
        token,
      }),

    /**
     * Send a PUT request to the API
     */
    put: <T>(
      endpoint: string,
      data?: unknown,
      options: Omit<ApiRequestOptions, "token"> = {}
    ) =>
      apiRequest<T>(endpoint, {
        ...options,
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
        token,
      }),

    /**
     * Send a DELETE request to the API
     */
    delete: <T>(
      endpoint: string,
      options: Omit<ApiRequestOptions, "token"> = {}
    ) => apiRequest<T>(endpoint, { ...options, method: "DELETE", token }),
  };
}

/**
 * Creates a client-side API client that automatically includes
 * the authentication token from the session when available.
 *
 * @param session Session information including accessToken if authenticated
 * @returns API client methods with authentication
 */
export function createAuthenticatedApiClient(session: Session | null) {
  return createApiClient(session?.accessToken);
}
