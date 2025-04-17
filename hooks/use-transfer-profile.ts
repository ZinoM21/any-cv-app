import { transferProfileFromCacheToUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import useApi from "./use-api";
/**
 * Transfer a profile from a guest user to a logged in user.
 * Should be called on success of the sign in mutation.
 * @param username - The username of the guest profile to transfer
 * @returns The transferred profile data
 */
export function useProfileTransfer() {
  const api = useApi();

  return useMutation({
    mutationFn: async (username: string) => {
      return await transferProfileFromCacheToUser(api, username);
    }
  });
}
