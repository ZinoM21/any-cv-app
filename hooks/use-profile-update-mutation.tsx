import { updateProfile } from "@/lib/api/api";
import { ProfileData } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import useApi from "./use-api";
import { useProfileStore } from "./use-profile";

export const useProfileUpdateMutation = () => {
  const [profileData, setProfileData] = useProfileStore(
    useShallow((state) => [state.profile, state.setProfile])
  );
  const api = useApi();

  return useMutation({
    mutationFn: async (values: Partial<ProfileData>) =>
      await updateProfile(api, profileData!.username!, values),
    onSuccess: (fetchedValues: Partial<ProfileData>) => {
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...fetchedValues
      }));
    }
  });
};
