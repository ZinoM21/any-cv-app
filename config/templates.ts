import { CVTemplate } from "@/lib/types";

export const cvTemplates: CVTemplate[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and straightforward design focusing on content clarity",
  },
  {
    id: "professional",
    name: "Professional",
    description:
      "Traditional layout ideal for corporate and formal applications",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Modern design with unique elements for creative industries",
  },
  // {
  //   id: "academic",
  //   name: "Academic",
  //   description:
  //     "Structured format perfect for academic and research positions",
  //   // image: "/placeholder.svg?height=400&width=300",
  // },
];

export function getTemplateById(id: string): CVTemplate | undefined {
  return cvTemplates.find((template) => template.id === id);
}
