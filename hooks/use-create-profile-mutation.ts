import { ProfileData } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

interface CreateProfileRequest {
  username: string;
  turnstileToken?: string;
}

export function useCreateProfileMutation() {
  return useMutation<ProfileData, Error, CreateProfileRequest>({
    mutationFn: async ({ username, turnstileToken }) => {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, turnstileToken })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to create profile");
      }

      return response.json();
    }
  });
}
