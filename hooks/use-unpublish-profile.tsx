import { unpublishProfile } from "@/lib/api/api";
import { ProfileData } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import useApi from "./use-api";
import { useProfileStore } from "./use-profile";

export const useUnpublishProfile = (username: string) => {
  const setProfileData = useProfileStore((state) => state.setProfile);
  const api = useApi();

  return useMutation({
    mutationFn: async () =>
      await unpublishProfile(api, username),
    onSuccess: (fetchedValues: Partial<ProfileData>) => {
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...fetchedValues
      }));
    }
  });
};
