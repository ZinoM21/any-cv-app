"use client";

import { useProfileStore } from "@/hooks/use-profile";
import type { ProfileData } from "@/lib/types";
import { useEffect } from "react";

export function SetProfileData({ profileData }: { profileData: ProfileData }) {
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    setProfile(profileData);
  }, [profileData, setProfile]);

  return null;
}
