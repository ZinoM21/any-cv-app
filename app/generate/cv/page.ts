import { PromiseSearchParams } from "@/lib/types";

import { redirect } from "next/navigation";

export default async function CVPage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;

  const { username } = params;

  if (!username) {
    redirect("/");
  }

  const searchParamsString = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  redirect(`/generate/cv/template?${searchParamsString}`);
}
