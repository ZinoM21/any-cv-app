import { getTemplateById } from "@/components/templates/website/website-template-gate";
import { PromiseSearchParams, TemplateId } from "@/lib/types";
import { redirect } from "next/navigation";
import WebsiteEditor from "./components/website-edior";
import {
  getProfileDataOrRedirect,
  getUsernameFromParamsOrRedirect,
  getTemplateIdFromParamsOrRedirect,
} from "@/lib/utils";

export default async function WebsiteEditorPage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;

  const username = getUsernameFromParamsOrRedirect(params);

  const redirectTo = `/generate/website/template?username=${username}`;
  const templateId = getTemplateIdFromParamsOrRedirect(params, redirectTo);
  if (!Object.values(TemplateId).includes(templateId as TemplateId)) {
    redirect(redirectTo);
  }

  const profileData = await getProfileDataOrRedirect(username);
  const template = getTemplateById(templateId as TemplateId);

  return (
    <div className="flex h-full flex-col">
      <WebsiteEditor profileData={profileData} template={template} />
    </div>
  );
}
