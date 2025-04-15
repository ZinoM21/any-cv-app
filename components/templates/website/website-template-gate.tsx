import { ProfileData, TemplateId, WebsiteTemplate } from "@/lib/types";
import { ReactElement } from "react";

import { websiteTemplates } from "@/config/templates";
import { DocumentProps } from "@react-pdf/renderer";
import TheClassicWebsite from "./classic";
import TheCreativeWebsite from "./creative";
import TheMinimalWebsite from "./minimal";
import TheModernWebsite from "./modern";

export const websiteTemplateComponentMap: {
  [P in TemplateId]: (props: {
    profileData: Partial<ProfileData>;
  }) => ReactElement<DocumentProps>;
} = {
  [TemplateId.Classic]: TheClassicWebsite,
  [TemplateId.Creative]: TheCreativeWebsite,
  [TemplateId.Modern]: TheModernWebsite,
  [TemplateId.Minimal]: TheMinimalWebsite,
};

/**
 * Returns the appropriate template Website component based on templateId
 */
export const getTemplateWebsiteById = (
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
