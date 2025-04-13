import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { SearchParams } from "next/dist/server/request/search-params";
import { SignInOptions as DefaultSignInOptions } from "next-auth/react";

export type ProfileData = {
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl?: string;
  headline?: string;
  about?: string;
  email?: string;
  phone?: string;
  location?: string;
  languages?: string[] | [];
  experiences: Experience[] | [];
  education: Education[] | [];
  skills: string[] | [];
  volunteering: VolunteeringExperience[] | [];
  projects: Project[] | [];
  publishingOptions?: PublishingOptions;
};

export type PublishingOptions = {
  darkMode?: boolean;
  templateId?: TemplateId;
};

export type Experience = {
  company: string;
  companyProfileUrl?: string;
  companyLogoUrl?: string;
  positions: Position[];
};

export type Position = {
  title: string;
  startDate: Date;
  endDate?: Date;
  duration?: string;
  description?: string;
  location?: string;
  workSetting?: string | null;
};

export type Education = {
  school: string;
  schoolProfileUrl?: string;
  schoolPictureUrl?: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: Date;
  endDate?: Date;
  grade?: string;
  activities?: string;
  description?: string;
};

export type VolunteeringExperience = {
  role: string;
  organization: string;
  organizationProfileUrl?: string;
  organizationLogoUrl?: string;
  cause?: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
};

export type Project = {
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  url?: string;
  associatedWith?: string;
};

export type NavItem = {
  name: string;
  href: string;
  variant: VariantProps<typeof buttonVariants>["variant"];
  disabled?: boolean;
};

export enum TemplateId {
  Minimal = "minimal",
  Creative = "creative",
  Classic = "classic",
}

export type CVTemplate = {
  id: TemplateId;
  name: string;
  description: string;
};

export type WebsiteTemplate = CVTemplate;

export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type Tokens = {
  access: string;
  refresh: string;
};

export type AccessResponse = Pick<Tokens, "access">;

export type DecodedToken = {
  sub: string;
  email: string;
  exp: number;
  iat: number;
};

export type AuthValidity = {
  access_until?: number;
  refresh_until?: number;
};

export type PromiseSearchParams = Promise<SearchParams>;

export type SignedUrl = {
  url: string;
  path: string;
};

export type SignInOptions = Pick<
  DefaultSignInOptions,
  "redirectTo" | "redirect"
> & {
  onSuccess?: () => void;
};
