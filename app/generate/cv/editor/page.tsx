import { ProfileData, PromiseSearchParams } from "@/lib/types";
import { redirect } from "next/navigation";
import CVEditor from "./components/cv-editor";

export default async function CVEditorPage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;
  const { username, templateId } = params;

  if (!username) {
    redirect("/");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${username}`
  );

  if (!response.ok) {
    redirect("/");
  }

  if (!templateId) {
    redirect(`/generate/cv/template?username=${username}`);
  }

  const profileData: ProfileData = await response.json();

  //   return (
  //     <div className="min-h-screen py-16">
  //       <div className="max-w-[1400px] mx-auto px-4"></div>
  //     </div>
  //   );

  return (
    <div className="flex h-screen flex-col">
      <CVEditor profileData={profileData} templateId={templateId as string} />
    </div>
  );
}
