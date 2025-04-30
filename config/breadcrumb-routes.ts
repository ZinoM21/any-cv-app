export interface RouteMapping {
  path: string;
  label: string;
  children?: Array<{
    path: string;
    label: string;
  }>;
}

export const routeMappings: RouteMapping[] = [
  {
    path: "choose",
    label: "Choose Format"
  },
  {
    path: "cv",
    label: "CV",
    children: [
      { path: "template", label: "Select Template" },
      { path: "editor", label: "Editor" }
    ]
  },
  {
    path: "website",
    label: "Website",
    children: [
      { path: "template", label: "Select Template" },
      { path: "editor", label: "Editor" }
    ]
  }
];
