"use client";

import type { ProfileData } from "@/lib/types";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeForcer = ({ profile }: { profile: ProfileData }) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(profile.publishingOptions?.appearance ?? "light");
  }, [profile.publishingOptions?.appearance, setTheme]);

  return null;
};

export default ThemeForcer;
