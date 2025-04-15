import { ProfileData } from "@/lib/types";

import { clsx, type ClassValue } from "clsx";
import * as jose from "jose";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { DecodedToken, TemplateId } from "./types";

import classicCV from "@/public/cvs/images/classic.jpg";
import creativeCV from "@/public/cvs/images/creative.jpg";
import minimalCV from "@/public/cvs/images/minimal.jpg";
import modernCV from "@/public/cvs/images/modern.jpg";

import classicWebsite from "@/public/websites/images/classic.jpg";
import creativeWebsite from "@/public/websites/images/creative.jpg";
import minimalWebsite from "@/public/websites/images/minimal.jpg";

import { format } from "date-fns";
import { StaticImageData } from "next/image";
import { getServerApi } from "./api/server-api";
import { ApiError } from "./errors";
import { getValidTemplateId, getValidUsername } from "./validation";

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
    case TemplateId.Modern:
      return modernCV;
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

/**
 * Fetches a username from params entry, or redirects to home if invalid
 *
 * @param username Username to fetch
 * @param redirectTo Redirect URL (default: "/")
 * @returns Valid username
 */
export const getUsernameFromParamsOrRedirect = (
  username: string | string[] | undefined | null,
  redirectTo: string = "/"
) => {
  const validUsername = getValidUsername(username);
  if (!validUsername) {
    redirect(redirectTo);
  }
  return validUsername;
};

export const getTemplateIdFromParamsOrRedirect = (
  templateId: string | string[] | undefined | null,
  redirectTo: string = "/"
) => {
  const validTemplateId = getValidTemplateId(templateId);
  if (!validTemplateId) {
    redirect(redirectTo);
  }
  return validTemplateId;
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
    if (error instanceof ApiError) {
      redirect(redirectTo);
    }
    throw error;
  }
}

const encodedSecret = new TextEncoder().encode(process.env.AUTH_SECRET);

/**
 * Decodes a JWT token and returns the payload
 *
 * @param token The JWT token to decode
 * @returns The decoded token payload (sub, exp, email, iat)
 */
export const getDecodedToken = async (token: string): Promise<DecodedToken> => {
  try {
    const { payload } = await jose.jwtVerify<DecodedToken>(
      token,
      encodedSecret
    );

    const { sub, exp, email, iat } = payload;

    if (!exp || !sub || !email || typeof email !== "string" || !iat) {
      throw new Error("Invalid token structure in token payload");
    }

    return payload;
  } catch (jwtError) {
    console.error("Error verifying JWT:", jwtError);
    throw jwtError;
  }
};

/**
 * Checks if a JWT token is valid based on its expiration time
 *
 * @param exp The expiration time of the token
 * @returns True if the token is valid, false otherwise
 */
export const isValidToken = (exp: number | undefined): boolean => {
  if (!exp) return false;
  return Date.now() < exp * 1000;
};
