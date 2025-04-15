import { getUsernameFromParamsOrRedirect } from "@/lib/utils";

import { getTemplateWebsiteById } from "@/components/templates/website/website-template-gate";
import { getPublishedProfileOrRedirect, getPublishedProfiles } from "@/lib/api";
import { Params } from "next/dist/server/request/params";
import { redirect } from "next/navigation";

export const revalidate = 3600; // hourly

export async function generateStaticParams() {
  try {
    const profiles = await getPublishedProfiles();
    return profiles.map((profile) => ({
      username: profile.username,
    }));
  } catch (error) {
    console.error("Error generating static params: ", error);
    return [];
  }
}

export default async function UserWebsitePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { username } = await params;

  const validUsername = getUsernameFromParamsOrRedirect(username, "/404");

  const profile = await getPublishedProfileOrRedirect(validUsername);

  if (!profile.publishingOptions?.templateId) {
    redirect("/404");
  }

  const template = getTemplateWebsiteById(
    profile.publishingOptions?.templateId,
    profile
  );

  return template;
}
