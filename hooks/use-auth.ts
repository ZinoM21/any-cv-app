"use client";

import { SignInFormValues, SignUpFormValues } from "@/lib/auth-schema";
import { useMutation } from "@tanstack/react-query";
import { signIn, SignInOptions as DefaultSignInOptions } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

type SignInOptions = Pick<DefaultSignInOptions, "redirectTo" | "redirect">;

type SignInVariables = SignInFormValues &
  SignInOptions & { onSuccess?: () => void };

/**
 * Type definition for the auth hook return value.
 */
interface UseAuthReturn {
  /**
   * Signs in a user with the provided credentials
   */
  signIn: (signInVariables: SignInVariables) => void;

  /**
   * Imitates the `signIn` function from next-auth, just for sign up.
   * Call it without params to just redirect to /signup page.
   * Call it with credentials and it will attempt to sign up the user.
   * @param credentials - The user signup credentials
   * @param options - Additional options for signup process
   * @returns A promise that resolves when signup is complete
   */
  signUp: (
    credentials?: SignUpFormValues,
    options?: {
      redirectTo?: string;
      redirect?: boolean;
    }
  ) => Promise<void>;

  /**
   * Whether authentication is in progress
   */
  isLoading: boolean;

  /**
   * Error message if authentication failed
   */
  error: string | undefined;
}

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

  const signInMutation = useMutation({
    mutationFn: async ({ onSuccess, ...rest }: SignInVariables) => {
      const response = await signIn("credentials", { ...rest, redirect: false }); // The fetch is handled in the authorize callback in @/auth

      if (response?.error) {
        throw new Error(response.error);
      }

      console.log("ALSJHDALSDJAS", response)
      return response;
    },
    onSuccess: async (response, { onSuccess }) => {
      if (onSuccess) {
        onSuccess();
      }
    },
    // onError: (error) => {
    //   console.error("Sign in error:", error.message);
    //   if (error.message === "CredentialsSignin") {
    //     toast.error("Invalid credentials. Try another email or password.");
    //   }
    // },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({
      credentials,
      redirectTo,
    }: {
      credentials: SignUpFormValues;
      redirectTo?: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to register");
      }

      const user = await response.json();
      return { user, credentials, redirectTo };
    },
    onSuccess: async ({ user, credentials, redirectTo }) => {
      await signIn("credentials", {
        email: user.email,
        password: credentials.password,
        redirectTo,
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
    signUpOptions?: SignInOptions
  ) => {
    // Get redirect url
    const { redirect = true } = signUpOptions ?? {};
    const redirectTo =
      signUpOptions?.redirectTo ??
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
      redirectTo: redirect ? redirectTo : undefined,
    });
  };

  return {
    signIn: signInMutation.mutate,
    signUp,
    isLoading: signInMutation.isPending || signUpMutation.isPending,
    error: signInMutation.error?.message || signUpMutation.error?.message,
  };
}
