import { getTemplateById } from "@/components/templates/website/website-template-gate";
import { PromiseSearchParams, TemplateId } from "@/lib/types";
import {
  buildQueryString,
  getProfileDataOrRedirect,
  getTemplateIdFromParamsOrRedirect,
  getUsernameFromParamsOrRedirect,
} from "@/lib/utils";
import WebsiteEditor from "./components/website-edior";

export default async function WebsiteEditorPage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;

  const username = getUsernameFromParamsOrRedirect(params.username);

  const redirectTo = `/generate/website/template?${buildQueryString(params)}`;
  const templateId = getTemplateIdFromParamsOrRedirect(
    params.templateId,
    redirectTo
  );

  const profileData = await getProfileDataOrRedirect(username);
  const template = getTemplateById(templateId as TemplateId);

  return (
    <div className="flex h-full flex-col">
      <WebsiteEditor profileData={profileData} template={template} />
    </div>
  );
}
