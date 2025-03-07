// import GenerateUI from "@/components/generate-ui";
import TheApply from "@/components/templates/the-apply/the-apply";
import TheBasic from "@/components/templates/the-basic/the-basic";

export default async function GeneratingPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${username}`
  );

  const profileData = await response.json();

  return <TheApply profileData={profileData} />;
  // return <TheBasic profileData={profileData} />;
}
