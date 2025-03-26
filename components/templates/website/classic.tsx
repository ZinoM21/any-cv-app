import { ProfileData } from "@/lib/types";

export default function TheClassicWebsite({
  profileData,
}: {
  profileData: Partial<ProfileData>;
}) {
  return <div>Hello {profileData.firstName}, Template not implemented yet</div>;
}
