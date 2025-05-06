import MadeWithBadge from "@/components/made-with-badge";
import ThemeForcer from "@/components/templates/website/theme-forcer";
import { getTemplateWebsiteById } from "@/components/templates/website/website-template-gate";
import { getPublishedProfileOrRedirect, getPublishedProfiles } from "@/lib/api";
import { Metadata } from "next";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: Promise<Params>;
};

// Cache this call since its called for metadata & page content
const fetchProfileFromParams = cache(async (params: Props["params"]) => {
  const { slug } = await params;

  if (typeof slug !== "string") {
    notFound();
  }

  return await getPublishedProfileOrRedirect(slug);
});

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await fetchProfileFromParams(params);

  return {
    title: `${profile.firstName} ${profile.lastName}`,
    description: profile.headline
  };
}

export default async function UserWebsitePage({ params }: Props) {
  const profile = await fetchProfileFromParams(params);

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
