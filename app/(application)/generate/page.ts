import { PromiseSearchParams } from "@/lib/types";
import { buildQueryString } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function GeneratePage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;

  const { username } = params;

  if (!username) {
    redirect("/");
  }

  redirect(`/generate/choose?${buildQueryString(params)}`);
}
