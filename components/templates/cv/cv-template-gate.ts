import { cvTemplates } from "@/config/templates";
import {
  CVTemplate,
  ProfileData,
  TemplateId,
  type ImageUrl
} from "@/lib/types";
import { DocumentProps } from "@react-pdf/renderer";
import { ReactElement } from "react";
import TheClassic from "./classic";
import TheModern from "./modern";
// import { ResumeDocument } from "./resume-two";

const templateComponentMap: {
  [P in TemplateId]: (props: {
    profileData: Partial<ProfileData>;
    signedUrlsMap?: Map<string, ImageUrl>;
  }) => ReactElement<DocumentProps>;
} = {
  [TemplateId.Classic]: TheClassic,
  [TemplateId.Modern]: TheModern
  // [TemplateId.Creative]: ResumeDocument
  // [TemplateId.Minimal]: ResumeDocument
};

/**
 * Returns the appropriate CV template PDF component based on templateId
 */
export const getPDFTemplateById = async (
  templateId: TemplateId,
  profileData: Partial<ProfileData>,
  signedUrlsMap?: Map<string, ImageUrl>
) => {
  const PDFTemplate = templateComponentMap[templateId];

  return PDFTemplate({ profileData, signedUrlsMap });
};

/**
 * Returns the appropriate CV template object based on templateId
 */
export function getTemplateById(id: TemplateId): CVTemplate {
  return cvTemplates.find((template) => template.id === id) as CVTemplate;
}
