"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { UseAuthReturn } from "@/lib/next-auth";
import { SignInFormValues, SignUpFormValues } from "@/lib/schemas/auth-schema";
import { SignInOptions } from "@/lib/types";
import { useSigninCredentialsMutation } from "./use-signin-credentials-mutation";
import { useSignupCredentialsMutation } from "./use-signup-credentials-mutation";

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

  const {
    mutateAsync: signInCredentials,
    isPending: isSignInPending,
    error: signInError
  } = useSigninCredentialsMutation();

  const {
    mutateAsync: signUpCredentials,
    isPending: isSignUpPending,
    error: signUpError
  } = useSignupCredentialsMutation();

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
                callbackUrl: redirectTo
              })
            : ""
        }`
      );
      return;
    }

    // Otherwise sign in user & pass redirect
    await signInCredentials({
      credentials,
      options: { redirect, redirectTo, ...options }
    });
  };

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
                callbackUrl: redirectTo
              })
            : ""
        }`
      );
      return;
    }

    // Otherwise sign up user & pass redirect
    await signUpCredentials({
      credentials,
      options: { redirect, redirectTo, ...options }
    });
  };

  return {
    signIn,
    signUp,
    isLoading: isSignInPending || isSignUpPending,
    error: signInError?.message || signUpError?.message
  };
}
