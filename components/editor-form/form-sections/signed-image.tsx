"use client";

import { useSignedUrl } from "@/hooks/use-image-url";

import { Image, type ImageProps } from "./image";

type SignedImageProps = Omit<ImageProps, "isFetching">;

export function SignedImage({ path, ...restProps }: SignedImageProps) {
  const { isFetching, data: signedUrl } = useSignedUrl(path);

  return <Image src={signedUrl?.url} isFetching={isFetching} {...restProps} />;
}
