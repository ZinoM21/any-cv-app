import { ProfileData, PromiseSearchParams } from "@/lib/types";
import { redirect } from "next/navigation";
import CVEditor from "./components/cv-editor";

export default async function CVEditorPage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;
  const { username, cvTemplate } = params;

  if (!username) {
    redirect("/");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/${username}`
  );

  if (!response.ok) {
    redirect("/");
  }

  if (!cvTemplate) {
    redirect(`/generate/cv/template?username=${username}`);
  }

  const profileData: ProfileData = await response.json();

  return (
    <div className="flex h-full flex-col">
      <CVEditor profileData={profileData} cvTemplate={cvTemplate as string} />
    </div>
  );
}
