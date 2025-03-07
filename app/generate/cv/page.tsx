import { ProfileData } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function GenerateCV({
  searchParams,
}: {
  searchParams: { username: string };
}) {
  const { username } = await searchParams;

  if (!username) {
    redirect("/");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${username}`
  );

  const profileData: ProfileData = await response.json();

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-4">Generate CV</h1>
      <p>Profile data for: {profileData.firstName + profileData.lastName}</p>
      {/* Add CV generation UI here */}
    </div>
  );
}
