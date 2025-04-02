import { useQuery, useMutation } from "@tanstack/react-query";
import { SignedUrl } from "@/lib/types";
/**
 * Custom hook to get a signed URL for a file
 *
 * @param filePath The file path to get a signed URL for
 * @returns An object with loading state and the signed URL
 */
export function useSignedUrl(filePath: string | undefined | null) {
  return useQuery({
    queryKey: ["imageUrl", filePath],
    queryFn: async () => {
      if (!filePath) {
        return null;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/files/signed-url`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_path: filePath,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch signed URL");
      }

      const data: SignedUrl = await response.json();
      return data.signed_url;
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
  const getSignedUploadUrl = async (file: File) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/files/signed-upload-url`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail);
    }

    const data: SignedUrl = await response.json();
    return data.signed_url;
  };

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const signedUrl = await getSignedUploadUrl(file);

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      return file.name;
    },
  });
}
