import { useQuery } from "@tanstack/react-query";

import { getUserProfiles } from "@/lib/api";
import useApi from "./use-api";
import { useSession } from "./use-session";

export function useUserProfiles() {
  const { isSignedIn, data: session } = useSession();
  const api = useApi();

  const enabled = isSignedIn && !!session?.user.id;

  const query = useQuery({
    queryKey: ["userProfiles", session?.user.id],
    queryFn: () => getUserProfiles(api),
    enabled,
    staleTime: 1000 * 60 * 5
  });

  return {
    ...query,
    refetch: enabled ? query.refetch : undefined
  };
}
