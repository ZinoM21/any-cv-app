"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export interface ImageProps extends React.ComponentProps<typeof AvatarImage> {
  isFetching: boolean;
  path?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  fallback?: string;
}

export function Image({
  path,
  alt,
  className,
  width,
  height,
  fallback,
  isFetching,
  ...restProps
}: ImageProps) {
  const [loading, setLoading] = useState(false);
  const isLoading = loading || isFetching;

  return (
    <Avatar className={cn("size-16 rounded-md", className)}>
      <AvatarImage
        src={path}
        alt={alt || "Image"}
        width={width || 80}
        height={height || 80}
        className="object-contain"
        onLoadingStatusChange={(status) => {
          if (status === "loading") {
            setLoading(true);
          }
          if (status !== "loading") {
            setLoading(false);
          }
        }}
        {...restProps}
      />
      <AvatarFallback>
        {isLoading ? (
          <Loader2 className="size-6 animate-spin" />
        ) : (
          fallback || "Logo"
        )}
      </AvatarFallback>
    </Avatar>
  );
}
