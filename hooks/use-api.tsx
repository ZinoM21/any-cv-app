"use client";

import { useSession } from "./use-session";
import { createApiClient } from "@/lib/api-client";

/**
 * React hook that provides access to the API client with authentication
 * from the current session when available.
 *
 * @returns API client methods for making authenticated requests
 */
export function useApi() {
  const { data: session } = useSession();
  return createApiClient(session?.accessToken);
}

export default useApi;
