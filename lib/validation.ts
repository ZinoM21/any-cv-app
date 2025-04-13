import { TemplateId } from "./types";

/**
 * Validates a username string against security requirements.
 * Requirements:
 * - Must be between 3 and 30 characters
 * - Can only contain alphanumeric characters, hyphens, and underscores
 * - Cannot start or end with a hyphen or underscore
 * - Cannot be an array
 * - Cannot contain consecutive hyphens or underscores
 * - Cannot contain any special characters or spaces
 * - Must be lowercase
 *
 * @param username The username to validate
 * @returns true if valid, false if invalid
 */
export function getValidUsername(
  username: string | string[] | undefined | null
): string | undefined {
  if (!username || Array.isArray(username)) {
    return undefined;
  }

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 30 ||
    username !== username.toLowerCase()
  ) {
    return undefined;
  }

  const validCharsRegex = /^[a-z0-9-_]+$/;
  if (!validCharsRegex.test(username)) {
    return undefined;
  }

  return username;
}

export function getValidTemplateId(
  templateId: string | string[] | undefined | null
): TemplateId | undefined {
  if (!templateId || Array.isArray(templateId)) {
    return undefined;
  }

  if (typeof templateId !== "string") {
    return undefined;
  }

  if (!Object.values(TemplateId).includes(templateId as TemplateId)) {
    return undefined;
  }

  return templateId as TemplateId;
}
