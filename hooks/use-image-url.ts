import { useApi } from "@/hooks/use-api";
import {
  getPublicUrl,
  getSignedUploadUrl,
  getSignedUrl,
  uploadFileToSignedUrl
} from "@/lib/api";
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
