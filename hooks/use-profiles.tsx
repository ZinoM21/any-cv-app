import { useQuery } from "@tanstack/react-query";

import useApi from "./use-api";
import { useSession } from "./use-session";

interface Profile {
  _id: string;
  username: string;
  name: string;
  firstName: string;
  lastName: string;
}

interface ApiError {
  response?: {
    status: number;
  };
}

export function useUserProfiles() {
  const { isSignedIn } = useSession();
  const api = useApi();

  const fetchUserProfiles = async (): Promise<Profile[]> => {
    try {
      return await api.get<Profile[]>("/v1/profile/user/list");
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError?.response?.status === 401) {
        return [];
      }
      throw error;
    }
  };

  return useQuery({
    queryKey: ["userProfiles"],
    queryFn: fetchUserProfiles,
    enabled: isSignedIn,
    staleTime: 1000 * 60 * 5,
  });
}
