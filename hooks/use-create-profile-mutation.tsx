import { createProfileFromRemoteData } from "@/lib/api";
import { ApiErrorType } from "@/lib/errors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useApi from "./use-api";

export function useCreateProfileMutation() {
  const api = useApi();

  return useMutation({
    mutationFn: async (username: string) => {
      return createProfileFromRemoteData(api, username);
    },
    onError: (error) => {
      if (error.message === ApiErrorType.ResourceAlreadyExists) {
        toast.error("Profile already exists. Try another link or username.");
      } else if (error.message === ApiErrorType.ResourceNotFound) {
        toast.error(
          "Couldn't find this profile. Try another link or username."
        );
      } else {
        toast.error("Couldn't create profile: " + error.message);
      }
    }
  });
}
