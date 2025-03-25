import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { SearchParams } from "next/dist/server/request/search-params";

export type ProfileData = {
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl?: string;
  headline?: string;
  about?: string;
  experiences: Experience[] | [];
  education: Education[] | [];
  skills: string[] | [];
  volunteering: VolunteeringExperience[] | [];
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

export type User = {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type Tokens = {
  access: string;
  refresh: string;
};

export type DecodedToken = {
  id: string;
  email: string;
  username: string;
  exp: number;
  iat: number;
};

export type AuthValidity = {
  access_until?: number;
  refresh_until?: number;
};

export type PromiseSearchParams = Promise<SearchParams>;
