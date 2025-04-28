"use client";

import { useMutation } from "@tanstack/react-query";

import { SignInFormValues } from "@/lib/schemas/auth-schema";
import { SignInOptions } from "@/lib/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useProfileStore } from "./use-profile";
import { useProfileTransfer } from "./use-transfer-profile";

export const useSigninCredentialsMutation = () => {
  const { push } = useRouter();

  const [profileData, setProfileData] = useProfileStore(
    useShallow((state) => [state.profile, state.setProfile])
  );

  const { mutateAsync: mutateProfileTransfer } = useProfileTransfer();

  const transferProfileIfPresent = async () => {
    // If a guest profile username was provided, call the transfer endpoint & update state
    if (profileData?.username) {
      await mutateProfileTransfer(profileData.username, {
        onSuccess: async (data) => {
          setProfileData(data);
        }
      });
    }
  };

  return useMutation({
    mutationFn: async ({
      credentials
    }: {
      credentials: SignInFormValues;
      options?: SignInOptions;
    }) => {
      // The fetch is handled by the authorize function from AuthJS
      const response = await signIn("credentials", {
        ...credentials,
        redirect: false
        // AuthJS does not allow for different redirect values on success vs on error
        // Therefore, always set redirect to false in the authorize call and
        // handle it manually in own onSuccess callback
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: async (response, { options }) => {
      const { onSuccess, redirect, redirectTo } = options || {};
      await transferProfileIfPresent();
      if (onSuccess) {
        await onSuccess();
      }
      if (redirect) {
        push(response?.url || redirectTo || "/");
      }
    },
    onError: (error) => {
      if (error.message === "CredentialsSignin") {
        toast.error("Invalid credentials. Try another email or password.");
      } else {
        toast.error(error.message);
      }
    }
  });
};
