import { ProfileData } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import useApi from "./use-api";
import useSession from "./use-session";

/**
 * Transfer a profile from a guest user to a logged in user.
 * Should be called on success of the sign in mutation.
 * @param username - The username of the guest profile to transfer
 * @returns The transferred profile data
 */
export function useProfileTransfer() {
  const api = useApi();
  const { update: updateSession } = useSession();

  return useMutation({
    mutationFn: async (username: string) => {
      // Ensure latest session (this hook will be called between useApi init and signIn)
      const session = await updateSession();

      if (!session?.accessToken) {
        throw new Error("No access token found");
      }

      const profileData = await api.get<ProfileData>(
        `/v1/profile/${username}/transfer`,
        {
          token: session?.accessToken,
        }
      );

      return profileData;
    },
  });
}
