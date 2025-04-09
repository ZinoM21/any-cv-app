import { useQuery, useMutation } from "@tanstack/react-query";
import { SignedUrl } from "@/lib/types";
import { useApi } from "@/hooks/use-api";

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
    queryFn: async () => {
      if (!filePath) {
        return null;
      }
      try {
        const signedUrlResponse = await api.post<SignedUrl>(
          `/v1/files/signed-url`,
          {
            file_path: filePath,
          }
        );

        return signedUrlResponse;
      } catch (error) {
        console.error("Failed to fetch signed URL", error);
        throw new Error("Failed to fetch signed URL");
      }
    },
    enabled: !!filePath,
  });
}

/**
 * Custom hook to upload a file using signed URLs
 *
 * @returns the useMutation hook with a file as the argument and `UseMutationResult` type as return value
 */
export function useSignedUploadUrl() {
  const api = useApi();

  const { mutateAsync: getSignedUploadUrl } = useMutation({
    mutationFn: async (file: File) => {
      const signedUrlResponse = await api.post<SignedUrl>(
        `/v1/files/signed-upload-url`,
        {
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
        }
      );

      return signedUrlResponse;
    },
    onError: (error) => {
      console.error("Failed to fetch signed URL", error);
      throw new Error("Failed to fetch signed URL");
    },
  });

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const signedUrlResponse = await getSignedUploadUrl(file);

      const uploadResponse = await fetch(signedUrlResponse.url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      return signedUrlResponse.path;
    },
  });
}
