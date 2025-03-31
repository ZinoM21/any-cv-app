import { useQuery } from "@tanstack/react-query";
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

