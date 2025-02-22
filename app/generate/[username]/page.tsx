// import GenerateUI from "@/components/generate-ui";
import TheApply from "@/components/templates/the-apply/the-apply";
import TheBasic from "@/components/templates/the-basic/the-basic";
import { profileData, profileDataZ } from "@/lib/content";

export default async function GeneratingPage() {
  // {params: { username }}: {params: { username: string };}
  // return <GenerateUI username={username} />;
  // const profileData = sessionStorage.getItem("");

  // return <TheApply profileData={profileDataZ} />;
  return <TheBasic profileData={profileDataZ} />;
}
