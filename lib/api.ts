import { redirect } from "next/navigation";
import { ProfileData } from "./types";

/**
 * Fetches a list of published profiles from the API.
 * This is used for pre-rendering top profiles in generateStaticParams.
 *
 * @returns Array of published profiles
 */
export async function getPublishedProfiles() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/published`
    );
    const data: ProfileData[] = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch published profiles:", error);
    return [];
  }
}

export async function getPublishedProfileOrRedirect(
  username: string,
  redirectTo: string = "/"
): Promise<ProfileData> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/published/${username}`
    );
    if (!res.ok) {
      redirect(redirectTo);
    }
    const data: ProfileData = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch published profile:", error);
    redirect(redirectTo);
  }
}
