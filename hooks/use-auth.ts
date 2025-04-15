"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn as authorize } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { UseAuthReturn } from "@/lib/next-auth";
import { SignInFormValues, SignUpFormValues } from "@/lib/schemas/auth-schema";
import { SignInOptions, User } from "@/lib/types";
import { useShallow } from "zustand/react/shallow";
import useApi from "./use-api";
import { useProfileStore } from "./use-profile";
import { useProfileTransfer } from "./use-transfer-profile";

/**
 * Custom hook for authentication
 * @returns {UseAuthReturn} The authentication methods and state
 *
 * @example
 * const { signIn, signUp, isLoading, error } = useAuth();
 */
export function useAuth(): UseAuthReturn {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const api = useApi();

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
        },
      });
    }
  };

  const signInMutation = useMutation({
    mutationFn: async ({
      credentials,
    }: {
      credentials: SignInFormValues;
      options?: SignInOptions;
    }) => {
      // The fetch is handled by the authorize function from AuthJS
      const response = await authorize("credentials", {
        ...credentials,
        redirect: false,
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
        replace(response?.url || redirectTo || "/");
      }
    },
    onError: (error) => {
      console.error("Sign in error:", error.message);
      if (error.message === "CredentialsSignin") {
        toast.error("Invalid credentials. Try another email or password.");
      }
    },
  });

  /**
   * Immitates the `signIn` function from next-auth, to handle callbackUrl query param manually.
   * Call it from anywhere without params to redirect to signin page.
   * Call it with credentials and it will attempt to sign in the user.
   *
   * @param credentials
   * @param options
   * @returns
   */
  const signIn = async (
    credentials?: SignInFormValues,
    options?: SignInOptions
  ) => {
    // Get redirect url
    const { redirect = true, redirectTo: initialRedirectTo } = options ?? {};

    const redirectTo =
      initialRedirectTo ??
      searchParams.get("callbackUrl") ??
      window.location.href;

    // If no creds are provided, redirect to signin page
    if (!credentials) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      replace(
        `${baseUrl}/signin?${
          //  attach callbackUrl to if provided
          redirect && redirectTo
            ? new URLSearchParams({
                callbackUrl: redirectTo,
              })
            : ""
        }`
      );
      return;
    }

    // Otherwise sign in user & pass redirect
    await signInMutation.mutateAsync({
      credentials,
      options: { redirect, redirectTo, ...options },
    });
  };

  const signUpMutation = useMutation({
    mutationFn: async ({
      credentials,
    }: {
      credentials: SignUpFormValues;
      options?: SignInOptions;
    }) => await api.post<User>("/v1/auth/register", credentials),
    onSuccess: async (user, { credentials, options }) => {
      await signInMutation.mutateAsync({
        credentials: { email: user.email, password: credentials.password },
        options,
      });
    },
    onError: (error) => {
      console.error("Sign up error:", error.message);
    },
  });

  /**
   * Immitates the `signIn` function from next-auth, just for sign up.
   * Call it from anywhere without params to redirect to signup page.
   * Call it with credentials and it will attempt to sign up the user.
   *
   * @param credentials
   * @param options
   * @returns
   */
  const signUp = async (
    credentials?: SignUpFormValues,
    options?: SignInOptions
  ) => {
    // Get redirect url
    const { redirect = true, redirectTo: initialRedirectTo } = options ?? {};
    const redirectTo =
      initialRedirectTo ??
      searchParams.get("callbackUrl") ??
      window.location.href;

    // If no creds are provided, redirect to signup page
    if (!credentials) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      replace(
        `${baseUrl}/signup?${
          //  attach callbackUrl to if provided
          redirect && redirectTo
            ? new URLSearchParams({
                callbackUrl: redirectTo,
              })
            : ""
        }`
      );
      return;
    }

    // Otherwise sign up user & pass redirect
    await signUpMutation.mutateAsync({
      credentials,
      options: { redirect, redirectTo, ...options },
    });
  };

  return {
    signIn,
    signUp,
    isLoading: signInMutation.isPending || signUpMutation.isPending,
    error: signInMutation.error?.message || signUpMutation.error?.message,
  };
}
