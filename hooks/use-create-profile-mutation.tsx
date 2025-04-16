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
        toast.error("Profile already exists");
      } else if (error.message === ApiErrorType.ResourceNotFound) {
        toast.error("Profile not found");
      } else {
        toast.error(error.message);
      }
    },
  });
}
