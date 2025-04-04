"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useSignedUrl } from "@/hooks/use-image-url";
import { cn } from "@/lib/utils";

interface SignedImageProps {
  src: string | undefined;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function SignedImage({
  src,
  alt,
  className,
  width,
  height,
}: SignedImageProps) {
  const { isFetching, data: logoUrl } = useSignedUrl(src);

  return (
    <div
      className={cn(
        "size-16 overflow-hidden rounded-md bg-muted shrink-0",
        className
      )}
    >
      {isFetching ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : logoUrl ? (
        <Image
          src={logoUrl}
          alt={alt || "Image"}
          width={width || 80}
          height={height || 80}
          className="size-full object-contain"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          Logo
        </div>
      )}
    </div>
  );
}
