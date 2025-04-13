import { ProfileData } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import useApi from "./use-api";
import { useShallow } from "zustand/react/shallow";
import { useProfileStore } from "./use-profile";

export const useProfileUpdateMutation = () => {
  const [profileData, setProfileData] = useProfileStore(
    useShallow((state) => [state.profile, state.setProfile])
  );
  const api = useApi();

  return useMutation({
    mutationFn: async (values: Partial<ProfileData>) =>
      api.patch<Partial<ProfileData>>(
        `/v1/profile/${profileData?.username}`,
        values
      ),
    onSuccess: (fetchedValues: Partial<ProfileData>) => {
      // Update profile state
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...fetchedValues,
      }));
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
