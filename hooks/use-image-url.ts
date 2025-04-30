import { useApi } from "@/hooks/use-api";
import { useProfileStore } from "@/hooks/use-profile";
import {
  getPublicUrl,
  getSignedUploadUrl,
  getSignedUrl,
  getSignedUrls,
  uploadFileToSignedUrl
} from "@/lib/api";
import { ImageUrl, ProfileData } from "@/lib/types";
import { getFilePaths, isUrl } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import useSession from "./use-session";

/**
 * Custom hook to get a signed URL for a file
 *
 * @param filePath The file path to get a signed URL for
 * @returns An object with loading state and the signed URL
 */
export function useSignedUrl(filePath: string | undefined | null) {
  const api = useApi();
  const { isSignedIn } = useSession();

  const enabled = !!filePath && !isUrl(filePath) && isSignedIn;

  const query = useQuery({
    queryKey: ["imageUrl", filePath],
    queryFn: async () => getSignedUrl(api, filePath!),
    enabled
  });

  return {
    ...query,
    refetch: enabled ? query.refetch : undefined
  };
}

/**
 * Custom hook to get all file URLs from a profile
 *
 * @param profile The profile data to extract file paths from
 * @returns An object with loading state and a map of file paths to their signed URLs
 */
export function useSignedUrlsMap(profile: Partial<ProfileData> | null) {
  const api = useApi();
  const { isSignedIn } = useSession();
  const [filePaths, setFilePaths] = useState<string[]>([]);

  useEffect(() => {
    if (!!profile) {
      const filePaths = getFilePaths(profile);
      setFilePaths(filePaths);
    }
  }, [profile]);

  const enabled =
    !!profile &&
    isSignedIn &&
    filePaths.length > 0 &&
    filePaths.every((filePath) => !isUrl(filePath));

  const query = useQuery({
    queryKey: ["profileSignedUrls", profile?._id],
    queryFn: async () => getSignedUrls(api, filePaths),
    enabled
  });

  return {
    ...query,
    data: new Map<string, ImageUrl>(
      query.data && query.data.map((url) => [url.path, url])
    ),
    refetch: enabled ? query.refetch : undefined
  };
}

/**
 * Custom hook to upload a file using signed URLs
 *
 * @returns the useMutation hook with a file as the argument and `UseMutationResult` type as return value
 */
export function useSignedUploadUrl() {
  const api = useApi();
  const profile = useProfileStore((state) => state.profile);
  const isPublic = !!profile?.publishingOptions?.slug;

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const signedUrlResponse = await getSignedUploadUrl(api, file);
      await uploadFileToSignedUrl(signedUrlResponse.url, file);

      if (isPublic) {
        const publicUrlResponse = await getSignedUploadUrl(api, file, isPublic);
        await uploadFileToSignedUrl(publicUrlResponse.url, file);
      }

      return signedUrlResponse.path;
    }
  });
}

/**
 * Custom hook to get a public URL for a file via a profile slug
 *
 * @param slug The profile slug
 * @param filePath The file path
 * @returns An object with loading state and the public URL
 */
export function usePublicUrl(
  slug: string | undefined,
  filePath: string | undefined | null
) {
  const api = useApi();

  const enabled = !!slug && !!filePath && !isUrl(filePath);

  const query = useQuery({
    queryKey: ["publicImageUrl", slug, filePath],
    queryFn: async () => getPublicUrl(api, slug!, filePath!), // assert here because we check for undefined in the enabled clause
    enabled
  });

  return {
    ...query,
    refetch: enabled ? query.refetch : undefined
  };
}
