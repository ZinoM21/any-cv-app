"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSignedUrl } from "@/hooks/use-image-url";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SignedImageProps {
  src: string | undefined;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  fallback?: string;
}

export function SignedImage({
  src,
  alt,
  className,
  width,
  height,
  fallback,
}: SignedImageProps) {
  const { isFetching, data: signedUrl } = useSignedUrl(src);

  return (
    <Avatar className={cn("size-16 rounded-md", className)}>
      {isFetching ? (
        <AvatarFallback>
          <Loader2 className="size-6 animate-spin" />
        </AvatarFallback>
      ) : signedUrl ? (
        <AvatarImage
          src={signedUrl.url}
          alt={alt || "Image"}
          width={width || 80}
          height={height || 80}
          className="object-contain"
        />
      ) : (
        <AvatarFallback>{fallback || "Logo"}</AvatarFallback>
      )}
    </Avatar>
  );
}
