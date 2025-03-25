import { ReactElement } from "react";
import { CVTemplate, ProfileData, TemplateId } from "@/lib/types";
import TheClassic from "./classic";
import { ResumeDocument } from "./resume-two";
import { cvTemplates } from "@/config/templates";
import { DocumentProps } from "@react-pdf/renderer";

const templateComponentMap: {
  [P in TemplateId]: (props: {
    profileData: Partial<ProfileData>;
  }) => ReactElement<DocumentProps>;
} = {
  [TemplateId.Classic]: TheClassic,
  [TemplateId.Creative]: ResumeDocument,
  [TemplateId.Minimal]: ResumeDocument,
};

/**
 * Returns the appropriate CV template PDF component based on templateId
 */
export const getTemplatePDFById = async (
  templateId: TemplateId,
  profileData: Partial<ProfileData>
) => {
  const TemplatePDFComponent =
    templateComponentMap[templateId] ||
    templateComponentMap[TemplateId.Classic];

  return await TemplatePDFComponent({ profileData });
};

/**
 * Returns the appropriate CV template object based on templateId
 */
export function getTemplateById(id: TemplateId): CVTemplate {
  return cvTemplates.find((template) => template.id === id) as CVTemplate;
}
