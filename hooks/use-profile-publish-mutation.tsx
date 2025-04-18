import { publishProfile } from "@/lib/api/api";
import { ProfileData, PublishingOptions } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import useApi from "./use-api";
import { useProfileStore } from "./use-profile";

export const useProfilePublishMutation = (username: string) => {
  const setProfileData = useProfileStore((state) => state.setProfile);
  const api = useApi();

  return useMutation({
    mutationFn: async (values: PublishingOptions) =>
      await publishProfile(api, username, values),
    onSuccess: (fetchedValues: Partial<ProfileData>) => {
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...fetchedValues
      }));
    }
  });
};
