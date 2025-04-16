"use client";

import { createApiClient, type ApiRequestOptions } from "@/lib/api";
import { useCallback } from "react";
import { useSession } from "./use-session";

/**
 * React hook that provides access to the API client with authentication
 * from the current session when available.
 *
 * @returns API client methods for making authenticated requests
 */
export function useApi() {
  const { data: session, update } = useSession();
  const api = createApiClient(session?.accessToken);

  // Always update session before making a request (since session is changing server-side on access-refresh)
  const get = useCallback(
    async <T,>(endpoint: string, options?: ApiRequestOptions) => {
      const session = await update();
      return api.get<T>(endpoint, {
        ...options,
        token: options?.token || session?.accessToken,
      });
    },
    [update, api]
  );

  const post = useCallback(
    async <T,>(
      endpoint: string,
      data?: unknown,
      options?: ApiRequestOptions
    ) => {
      const session = await update();
      return api.post<T>(endpoint, data, {
        ...options,
        token: options?.token || session?.accessToken,
      });
    },
    [update, api]
  );

  const put = useCallback(
    async <T,>(
      endpoint: string,
      data?: unknown,
      options?: ApiRequestOptions
    ) => {
      const session = await update();
      return api.put<T>(endpoint, data, {
        ...options,
        token: options?.token || session?.accessToken,
      });
    },
    [update, api]
  );

  const patch = useCallback(
    async <T,>(
      endpoint: string,
      data?: unknown,
      options?: ApiRequestOptions
    ) => {
      const session = await update();
      return api.patch<T>(endpoint, data, {
        ...options,
        token: options?.token || session?.accessToken,
      });
    },
    [update, api]
  );

  const del = useCallback(
    async <T,>(endpoint: string, options?: ApiRequestOptions) => {
      const session = await update();
      return api.delete<T>(endpoint, {
        ...options,
        token: options?.token || session?.accessToken,
      });
    },
    [update, api]
  );

  return {
    get,
    post,
    put,
    patch,
    delete: del,
  };
}

export default useApi;
