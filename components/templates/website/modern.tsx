import { ProfileData } from "@/lib/types";

export default function TheModernWebsite({
  profileData,
}: {
  profileData: Partial<ProfileData>;
}) {
  return <div>Hello {profileData.firstName}, Template not implemented yet</div>;
}
