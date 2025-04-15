import {
  SessionContextValue,
  useSession as useNextAuthSession,
} from "next-auth/react";

interface UseSessionOptions<R extends boolean> {
  required: R;
  /** Defaults to `signIn` */
  onUnauthenticated?: () => void;
}

type ExtendedSession<R extends boolean> = SessionContextValue<R> & {
  isSignedIn: boolean;
  isSignedOut: boolean;
  isLoading: boolean;
};

/**
 * React Hook that gives you access
 * to the logged in user's session data.
 *
 * Extends the default useSession hook by next-auth:
 * [Documentation](https://next-auth.js.org/getting-started/client#usesession)
 */
export function useSession<R extends boolean>(
  options?: UseSessionOptions<R>
): ExtendedSession<R> {
  const session = useNextAuthSession(options);

  return {
    ...session,
    isSignedIn: !!session.data, // better than using status, since it switches to loading on session update
    isSignedOut: session.status === "unauthenticated",
    isLoading: session.status === "loading",
  };
}

export default useSession;
