import { getTemplateById } from "@/components/templates/website/website-template-gate";
import { ProfileData, PromiseSearchParams, TemplateId } from "@/lib/types";
import { redirect } from "next/navigation";
import WebsiteEditor from "./components/website-edior";

export default async function WebsiteEditorPage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;
  const { username, templateId } = params;

  if (!username) {
    redirect("/");
  }

  if (
    !templateId ||
    (templateId &&
      !Object.values(TemplateId).includes(templateId as TemplateId))
  ) {
    redirect(`/generate/website/template?username=${username}`);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/${username}`
  );

  if (!response.ok) {
    redirect("/");
  }

  const profileData: ProfileData = await response.json();
  const template = getTemplateById(templateId as TemplateId);

  return (
    <div className="flex h-full flex-col">
      <WebsiteEditor profileData={profileData} template={template} />
    </div>
  );
}
