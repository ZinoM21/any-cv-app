"use client";

import { useSignedUrl } from "@/hooks/use-image-url";

import { Image, type ImageProps } from "./image";

type SignedImageProps = Omit<ImageProps, "isFetching">;

export function SignedImage({ src, ...restProps }: SignedImageProps) {
  const { isFetching, data: signedUrl } = useSignedUrl(src);

  return <Image src={signedUrl?.url} isFetching={isFetching} {...restProps} />;
}
