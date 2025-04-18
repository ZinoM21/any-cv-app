"use client";

import { usePublicUrl } from "@/hooks/use-image-url";

import { Image, type ImageProps } from "./image";

type PublicImageProps = Omit<ImageProps, "isFetching"> & {
  slug: string;
};

export function PublicImage({ slug, path, ...restProps }: PublicImageProps) {
  const { isFetching, data: publicUrl } = usePublicUrl(slug, path);

  return <Image src={publicUrl?.url} isFetching={isFetching} {...restProps} />;
}
