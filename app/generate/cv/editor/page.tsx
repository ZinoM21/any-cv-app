import { PromiseSearchParams, TemplateId } from "@/lib/types";
import { redirect } from "next/navigation";
import CVEditor from "./components/cv-editor";
import { getTemplateById } from "@/components/templates/cv/cv-template-gate";
import {
  getProfileDataOrRedirect,
  getUsernameFromParamsOrRedirect,
  getTemplateIdFromParamsOrRedirect,
} from "@/lib/utils";

export default async function CVEditorPage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;

  const username = getUsernameFromParamsOrRedirect(params);

  const redirectTo = `/generate/cv/template?username=${username}`;
  const templateId = getTemplateIdFromParamsOrRedirect(params, redirectTo);
  if (!Object.values(TemplateId).includes(templateId as TemplateId)) {
    redirect(redirectTo);
  }

  const profileData = await getProfileDataOrRedirect(username);
  const template = getTemplateById(templateId as TemplateId);

  return (
    <div className="flex h-full flex-col">
      <CVEditor profileData={profileData} template={template} />
    </div>
  );
}
