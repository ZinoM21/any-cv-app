import { auth, signOut } from "@/auth";
import { createApiClient } from "@/lib/api";

/**
 * Server-side function that provides access to the API client with authentication
 * from the current session when available.
 *
 * @returns API client methods for making authenticated requests
 */
export async function getServerApi() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    signOut({ redirectTo: "/signin" });
  }
  return createApiClient(session?.accessToken);
}
