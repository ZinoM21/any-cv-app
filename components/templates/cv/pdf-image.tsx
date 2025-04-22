"use client";

import { usePublicUrl } from "@/hooks/use-image-url";
import { Image, type ImageWithSrcProp } from "@react-pdf/renderer";

interface PDFImageProps extends Omit<ImageWithSrcProp, "src"> {
  path: string;
}

export function PDFImage({ path, ...props }: PDFImageProps) {
  const { isFetching, data } = usePublicUrl("zinomeyer", path);

  if (!data?.url || isFetching) return null;

  return <Image src={data.url} {...props} />;
}
