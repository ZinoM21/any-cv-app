import { getTemplateById } from "@/components/templates/cv/cv-template-gate";
import { getProfileDataOrRedirect } from "@/lib/api";
import { PromiseSearchParams, TemplateId } from "@/lib/types";
import {
  buildQueryString,
  getTemplateIdFromParamsOrRedirect,
  getUsernameFromParamsOrRedirect
} from "@/lib/utils";
import CVEditor from "./components/cv-editor";

export default async function CVEditorPage({
  searchParams
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;

  const username = getUsernameFromParamsOrRedirect(params.username);

  const redirectTo = `/generate/cv/template?${buildQueryString(params)}`;
  const templateId = getTemplateIdFromParamsOrRedirect(
    params.templateId,
    redirectTo
  );

  const profileData = await getProfileDataOrRedirect(username);
  const template = getTemplateById(templateId as TemplateId);

  return (
    <div className="flex h-full flex-col">
      <CVEditor profileData={profileData} template={template} />
    </div>
  );
}
