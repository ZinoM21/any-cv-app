import { PromiseSearchParams } from "@/lib/types";
import { websiteTemplates } from "@/config/templates";
import {
  getProfileDataOrRedirect,
  getUsernameFromParamsOrRedirect,
} from "@/lib/utils";

import WebsiteTemplateCard from "./components/website-template-card";

export default async function WebsiteTemplatePage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;

  const username = getUsernameFromParamsOrRedirect(params.username);

  const profileData = await getProfileDataOrRedirect(username);

  return (
    <div className="flex flex-col gap-10 h-full max-w-[1400px] mx-auto pt-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight   sm:text-4xl">
          Choose Your Website Template, {profileData.firstName}
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Select a template that best represents your professional style and
          career goals. You can customize it further after selection.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {websiteTemplates.map((template) => (
          <WebsiteTemplateCard
            key={template.id}
            params={params}
            template={template}
            username={username}
          />
        ))}
      </div>
    </div>
  );
}
