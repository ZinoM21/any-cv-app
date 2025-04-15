import { PromiseSearchParams } from "@/lib/types";
import { buildQueryString } from "@/lib/utils";
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

  redirect(`/generate/cv/template?${buildQueryString(params)}`);
}
