import { useApi } from "@/hooks/use-api";
import {
  getPublicUrl,
  getSignedUploadUrl,
  getSignedUrl,
  getSignedUrls,
  uploadFileToSignedUrl
} from "@/lib/api";
import { ImageUrl, ProfileData } from "@/lib/types";
import { getFilePaths } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Custom hook to get a signed URL for a file
 *
 * @param filePath The file path to get a signed URL for
 * @returns An object with loading state and the signed URL
 */
export function useSignedUrl(filePath: string | undefined | null) {
  const api = useApi();

  return useQuery({
    queryKey: ["imageUrl", filePath],
    queryFn: async () => getSignedUrl(api, filePath!),
    enabled: !!filePath && filePath !== ""
  });
}

/**
 * Custom hook to get all file URLs from a profile
 *
 * @param profile The profile data to extract file paths from
 * @returns An object with loading state and a map of file paths to their signed URLs
 */
export function useSignedUrlsMap(profile: Partial<ProfileData> | null) {
  const api = useApi();

  return useQuery({
    queryKey: ["profileSignedUrls", profile?._id],
    queryFn: async () => {
      const filePaths = getFilePaths(profile!); // assert here because we check for null in the enabled clause

      if (filePaths.length === 0) return new Map<string, ImageUrl>();

      const signedUrls = await getSignedUrls(api, filePaths);

      const urlMap = new Map<string, ImageUrl>();

      signedUrls.forEach((url) => {
        urlMap.set(url.path, url);
      });

      return urlMap;
    },
    enabled: !!profile
  });
}

/**
 * Custom hook to upload a file using signed URLs
 *
 * @returns the useMutation hook with a file as the argument and `UseMutationResult` type as return value
 */
export function useSignedUploadUrl() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const signedUrlResponse = await getSignedUploadUrl(api, file);

      try {
        await uploadFileToSignedUrl(signedUrlResponse.url, file);
      } catch (error) {
        toast.error("Failed to upload file");
        throw error;
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
  slug: string,
  filePath: string | undefined | null
) {
  const api = useApi();

  return useQuery({
    queryKey: ["publicImageUrl", slug, filePath],
    queryFn: async () => getPublicUrl(api, slug, filePath!),
    enabled: !!slug && !!filePath
  });
}
