import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  return str.charAt(0).toUpperCase() + str.slice(1)
}