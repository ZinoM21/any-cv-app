import { CVTemplate, TemplateId } from "@/lib/types";

export const cvTemplates: CVTemplate[] = [
  {
    id: TemplateId.Minimal,
    name: "Minimal",
    description: "Clean and straightforward design focusing on content clarity",
  },
  {
    id: TemplateId.Creative,
    name: "Creative",
    description: "Modern design with unique elements for creative industries",
  },
  {
    id: TemplateId.Classic,
    name: "Classic",
    description:
      "Traditional layout ideal for corporate and formal applications",
  },
];

export const websiteTemplates = cvTemplates;
