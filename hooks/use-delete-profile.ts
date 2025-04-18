import { deleteProfile } from "@/lib/api/api";
import { useMutation } from "@tanstack/react-query";
import useApi from "./use-api";

export const useDeleteProfile = (username: string) => {
  const api = useApi();

  return useMutation({
    mutationFn: async () => await deleteProfile(api, username)
  });
};
