"use client";

import { useMutation } from "@tanstack/react-query";

import { registerUser } from "@/lib/api";
import { SignUpFormValues } from "@/lib/schemas/auth-schema";
import { SignInOptions } from "@/lib/types";
import useApi from "./use-api";
import { useSigninCredentialsMutation } from "./use-signin-credentials-mutation";

export const useSignupCredentialsMutation = () => {
  const api = useApi();
  const signInCredentialsMutation = useSigninCredentialsMutation();

  return useMutation({
    mutationFn: async ({
      credentials
    }: {
      credentials: SignUpFormValues;
      options?: SignInOptions;
    }) => await registerUser(api, credentials),
    onSuccess: async (user, { credentials, options }) => {
      await signInCredentialsMutation.mutateAsync({
        credentials: { email: user.email, password: credentials.password },
        options
      });
    },
    onError: (error, { options }) => {
      options?.onError?.(error);
    }
  });
};
