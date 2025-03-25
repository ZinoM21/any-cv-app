import { ProfileData, PromiseSearchParams, TemplateId } from "@/lib/types";
import { redirect } from "next/navigation";
import CVEditor from "./components/cv-editor";
import { getTemplateById } from "@/components/templates/cv/cv-template-gate";

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

  if (
    !cvTemplate ||
    (cvTemplate &&
      !Object.values(TemplateId).includes(cvTemplate as TemplateId))
  ) {
    redirect(`/generate/cv/template?username=${username}`);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/${username}`
  );

  if (!response.ok) {
    redirect("/");
  }

  const profileData: ProfileData = await response.json();
  const template = getTemplateById(cvTemplate as TemplateId);

  return (
    <div className="flex h-full flex-col">
      <CVEditor profileData={profileData} template={template} />
    </div>
  );
}
