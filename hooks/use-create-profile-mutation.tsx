import { createProfileFromRemoteData } from "@/lib/api";
import { ApiErrorType } from "@/lib/errors";
import type { SubmitLinkFormValues } from "@/lib/schemas/submit-link-schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useApi from "./use-api";

export function useCreateProfileMutation() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({
      linkedInUrl,
      turnstileToken
    }: SubmitLinkFormValues) => {
      return createProfileFromRemoteData(api, linkedInUrl, turnstileToken);
    },
    onError: (error) => {
      if (error.message === ApiErrorType.ResourceAlreadyExists) {
        toast.error(
          "A profile for this username already exists. Try another link or username."
        );
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
