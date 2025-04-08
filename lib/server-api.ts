import { auth } from "@/auth";
import { createApiClient } from "@/lib/api-client";

/**
 * Server-side function that provides access to the API client with authentication
 * from the current session when available.
 *
 * @returns API client methods for making authenticated requests
 */
export async function getServerApi() {
  const session = await auth();
  return createApiClient(session?.accessToken);
}
