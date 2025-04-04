import { auth } from "@/auth";
import { createAuthenticatedApiClient } from "@/lib/api-client";

/**
 * Server-side function that provides access to the API client with authentication
 * from the current session when available.
 *
 * @returns API client methods for making authenticated requests
 */
export async function createServerApiClient() {
  const session = await auth();
  return createAuthenticatedApiClient(session);
}

/**
 * Lazy-initialized server API client.
 * Use this function to get the API client when needed.
 */
export function getServerApi() {
  return createServerApiClient();
}
