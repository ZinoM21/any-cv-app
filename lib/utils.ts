import { ProfileData } from "@/lib/types";

import { redirect } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TemplateId } from "./types";

import minimalCV from "@/public/cvs/images/minimal.jpg";
import creativeCV from "@/public/cvs/images/creative.jpg";
import classicCV from "@/public/cvs/images/classic.jpg";

import minimalWebsite from "@/public/websites/images/minimal.jpg";
import creativeWebsite from "@/public/websites/images/creative.jpg";
import classicWebsite from "@/public/websites/images/classic.jpg";

import { StaticImageData } from "next/image";
import { format } from "date-fns";
import { SearchParams } from "next/dist/server/request/search-params";
import { getServerApi } from "./server-api";
import { ApiError } from "./api-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) =>
  date ? format(new Date(date), "MMM uu") : "";

export function extractUsernameFromLinkedInUrl(username: string): string {
  // Check if the input is a URL
  if (username.includes("/")) {
    // Match LinkedIn URLs in various formats
    const match = username.match(
      /^(?:https?:\/\/)?(?:[\w]+\.)?linkedin\.com\/in\/([\w\-]+)\/?.*$/
    );

    if (!match) {
      console.warn(`Invalid LinkedIn URL received: ${username}`);
      throw new Error(
        "Invalid LinkedIn URL. Must be a LinkedIn profile URL (/in/) or just the username"
      );
    }

    return match[1];
  } else {
    // Validate username format when provided directly
    if (!/^[\w\-]+$/.test(username)) {
      console.warn(`Invalid username format: ${username}`);
      throw new Error("Invalid username format");
    }

    return username;
  }
}

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getCVImage = (templateId: TemplateId): StaticImageData => {
  switch (templateId) {
    case TemplateId.Creative:
      return creativeCV;
    case TemplateId.Classic:
      return classicCV;
    case TemplateId.Minimal:
      return minimalCV;
    default:
      return classicCV;
  }
};

export const getWebsitePreviewImage = (
  templateId: TemplateId
): StaticImageData => {
  switch (templateId) {
    case TemplateId.Creative:
      return creativeWebsite;
    case TemplateId.Classic:
      return classicWebsite;
    case TemplateId.Minimal:
      return minimalWebsite;
    default:
      return classicWebsite;
  }
};

export const formatDateRange = (startDate: Date, endDate?: Date): string => {
  const start = format(startDate, "MMM uu");

  if (!endDate) {
    return `${start} - Present`;
  }

  const end = format(endDate, "MMM uu");

  return `${start} - ${end}`;
};

export const getUsernameFromParamsOrRedirect = (
  searchParams: SearchParams,
  redirectTo: string = "/"
) => {
  const username = searchParams.username;
  if (!username) {
    redirect(redirectTo);
  }
  return Array.isArray(username) ? username[0] : username;
};

export const getTemplateIdFromParamsOrRedirect = (
  searchParams: SearchParams,
  redirectTo: string = "/"
) => {
  const templateId = searchParams.templateId;
  if (!templateId) {
    redirect(redirectTo);
  }
  return Array.isArray(templateId) ? templateId[0] : templateId;
};

/**
 * Fetches profile data for a username, or redirects to home if an error occurs
 *
 * @param username LinkedIn username to fetch profile for
 * @returns ProfileData if successful, or redirects to home
 */
export async function getProfileDataOrRedirect(
  username: string,
  redirectTo: string = "/"
): Promise<ProfileData> {
  const serverApi = await getServerApi();
  try {
    return await serverApi.get<ProfileData>(`/v1/profile/${username}`);
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    if (error instanceof ApiError && error.status == 404) {
      redirect(redirectTo);
    }
    throw error;
  }
}
