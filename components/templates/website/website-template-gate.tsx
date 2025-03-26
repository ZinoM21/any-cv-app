import { ReactElement } from "react";
import { ProfileData, TemplateId, WebsiteTemplate } from "@/lib/types";

import { websiteTemplates } from "@/config/templates";
import { DocumentProps } from "@react-pdf/renderer";
import TheCreativeWebsite from "./creative";
import TheClassicWebsite from "./classic";
import TheMinimalWebsite from "./minimal";

export const websiteTemplateComponentMap: {
  [P in TemplateId]: (props: {
    profileData: Partial<ProfileData>;
  }) => ReactElement<DocumentProps>;
} = {
  [TemplateId.Classic]: TheClassicWebsite,
  [TemplateId.Creative]: TheCreativeWebsite,
  [TemplateId.Minimal]: TheMinimalWebsite,
};

/**
 * Returns the appropriate template Website component based on templateId
 */
export const getTemplateWebsiteById = async (
  templateId: TemplateId,
  profileData: Partial<ProfileData>
) => {
  const TemplateWebsiteComponent =
    websiteTemplateComponentMap[templateId] ||
    websiteTemplateComponentMap[TemplateId.Classic];

  return TemplateWebsiteComponent({ profileData });
};

/**
 * Returns the appropriate Website template object based on templateId
 */
export function getTemplateById(id: TemplateId): WebsiteTemplate {
  return websiteTemplates.find(
    (template) => template.id === id
  ) as WebsiteTemplate;
}
