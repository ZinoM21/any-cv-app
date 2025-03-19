import { PromiseSearchParams } from "@/lib/types";

import { redirect } from "next/navigation";

export default async function CVPage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const _searchParams = await searchParams;

  const searchParamsString = new URLSearchParams(
    _searchParams as Record<string, string>
  ).toString();

  redirect(`/generate/cv/template?${searchParamsString}`);
}
