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
import type { SearchParams } from "next/dist/server/request/search-params";
import { StaticImageData } from "next/image";
import { getValidTemplateId, getValidUsername } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

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

const buildUrlParams = (params: URLSearchParams | SearchParams | undefined) => {
  if (!params) return new URLSearchParams();

  if (params instanceof URLSearchParams) {
    return new URLSearchParams(params.toString());
  }

  const newParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        newParams.append(key, item);
      });
    } else {
      newParams.set(key, value);
    }
  });
  return newParams;
};

/**
 * Builds a URL query string from search params, with options to exclude specific parameters
 * or override specific parameters.
 *
 * @param params The search params from useSearchParams() or SearchParams from server components. Can be undefined.
 * @param options Configuration options
 * @param options.exclude Array of param keys to exclude
 * @param options.set Parameters to set/override as key-value pairs (overwrites existing values)
 * @param options.append Parameters to append as key-value pairs (does not overwrite existing values)
 * @returns A query string without '?' prefix, ready to be appended to a URL. Defaults to params passed in. Is empty string if params is undefined.
 */
export function buildQueryString(
  params: URLSearchParams | SearchParams | undefined,
  options: {
    exclude?: string[];
    set?: Record<string, string>;
    append?: Record<string, string>;
  } = {}
): string {
  if (!params) return "";

  const { exclude = [], set = {}, append = {} } = options;

  const newParams = buildUrlParams(params);

  // Exclude
  exclude.forEach((key) => newParams.delete(key));

  // Set/override
  Object.entries(set).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      newParams.set(key, value);
    }
  });

  // Append
  Object.entries(append).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      newParams.append(key, value);
    }
  });

  return newParams.toString();
}

/**
 * Converts a string to snake_case and appends "_logo" for image file names
 * @param str Input string to convert
 * @returns Snake case string with "_logo" suffix
 */
export const getSnakeCaseFileName = (str: string): string => {
  if (!str) return "image_logo";

  // Convert to snake_case
  let sanitized = str.toLowerCase().replace(/[^a-z0-9]/g, "_");
  // Remove repeated underscores
  sanitized = sanitized.replace(/_+/g, "_");
  // Remove underscores from start/end
  sanitized = sanitized.replace(/^_|_$/g, "");

  return `${sanitized}_logo`;
};
