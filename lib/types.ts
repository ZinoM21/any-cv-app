import { SearchParams } from "next/dist/server/request/search-params";

export type ProfileData = {
  firstName: string;
  lastName: string;
  username: string;
  profilePictureUrl?: string;
  jobTitle: string;
  headline: string;
  about: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  volunteering: VolunteeringExperience[];
};

export type Experience = {
  company: string;
  companyProfileUrl?: string;
  companyLogoUrl?: string;
  positions: Position[];
};

export type Position = {
  title: string;
  startDate: string;
  endDate?: string;
  duration?: string;
  description?: string;
  location?: string;
  workSetting?: string | null;
};

export type Education = {
  school: string;
  schoolProfileUrl?: string;
  schoolPictureUrl?: string; // Added this line
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  activities?: string | null;
  description?: string | null;
};

export type VolunteeringExperience = {
  role: string;
  organization: string;
  organizationProfileUrl?: string;
  cause: string;
  startDate: string;
  endDate?: string;
  description: string;
};

export type NavItem = {
  name: string;
  href: string;
  disabled?: boolean;
};

export type CVTemplate = {
  id: string;
  name: string;
  description: string;
};

export type PromiseSearchParams = Promise<SearchParams>;
