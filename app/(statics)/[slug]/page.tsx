import MadeWithBadge from "@/components/made-with-badge";
import ThemeForcer from "@/components/templates/website/theme-forcer";
import { getTemplateWebsiteById } from "@/components/templates/website/website-template-gate";
import { getPublishedProfileOrRedirect, getPublishedProfiles } from "@/lib/api";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";

export const revalidate = 3600; // hourly

export async function generateStaticParams() {
  try {
    const profiles = await getPublishedProfiles();
    return profiles.map((profile) => ({
      slug: profile.publishingOptions?.slug
    }));
  } catch (error) {
    console.error("Error generating static params: ", error);
    return [];
  }
}

export default async function UserWebsitePage({
  params
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  if (typeof slug !== "string") {
    notFound();
  }

  const profile = await getPublishedProfileOrRedirect(slug);

  if (!profile.publishingOptions?.templateId) {
    notFound();
  }

  const template = getTemplateWebsiteById(
    profile.publishingOptions?.templateId,
    profile
  );

  return (
    <>
      {template}
      <MadeWithBadge />
      <ThemeForcer profile={profile} />
    </>
  );
}
