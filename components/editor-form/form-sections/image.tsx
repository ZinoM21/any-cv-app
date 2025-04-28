"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePublicUrl, useSignedUrl } from "@/hooks/use-image-url";
import { cn, isUrl } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

/**
 * Generic image component that displays an image with fallback text. All props are from the HTML img tag, except:
 *
 * @param fallback The fallback text to display if the image is not found.
 * @param isFetching A boolean to show a loading spinner as fallback.
 * @returns The Image component
 */
export function GenericImage({
  src,
  alt,
  className,
  width,
  height,
  fallback,
  isFetching,
  ...restProps
}: Omit<ImageProps, "slug"> & { isFetching?: boolean }) {
  const [loading, setLoading] = useState(false);
  const isLoading = loading || isFetching;

  return (
    <Avatar className={cn("size-16 rounded-md", className)}>
      <AvatarImage
        src={src}
        alt={alt || "Image"}
        width={width || 512}
        height={height || 512}
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

function PublicImage({
  src,
  slug,
  ...restProps
}: ImageProps & { src: string }) {
  const { isFetching, data: publicUrl } = usePublicUrl(slug, src);

  return (
    <GenericImage src={publicUrl?.url} isFetching={isFetching} {...restProps} />
  );
}

function SignedImage({
  src,
  ...restProps
}: Omit<ImageProps, "slug"> & { src: string }) {
  console.log("src", src);
  const { isFetching, data: signedUrl } = useSignedUrl(src);

  return (
    <GenericImage src={signedUrl?.url} isFetching={isFetching} {...restProps} />
  );
}

/**
 * Shared props for the image components
 */
interface ImageProps extends React.ComponentProps<typeof AvatarImage> {
  fallback?: string;
  slug?: string;
}

/**
 * A component that displays an image from a path or URL.
 * If the input string is a URL, it will display the image directly.
 * If the input string is a path, it will fetch a signed URL first, then display the image.
 *
 * @param src The image source. Can be a URL, a file path, or a Blob.
 * @param slug Used to fetch a public URL if the image is a file path.
 * @param restProps All other props <img> tag props.
 * @returns Either a GenericImage, a PublicImage, or a SignedImage component
 */
export function Image({ src, slug, ...restProps }: ImageProps) {
  if (isUrl(src) || src instanceof Blob || !src) {
    return <GenericImage src={src} {...restProps} />;
  }

  if (!!slug) {
    return <PublicImage src={src} slug={slug} {...restProps} />;
  }

  return <SignedImage src={src} {...restProps} />;
}
