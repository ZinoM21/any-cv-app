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

type Experience = {
  company: string;
  companyProfileUrl?: string;
  companyLogoUrl?: string;
  positions: Position[];
  //   startDate: string;
  //   endDate?: string;
  //   duration?: string;
  //   description: string;
  //   location?: string;
  //   workSetting?: string;
};

type Position = {
  title: string;
  startDate: string;
  endDate?: string;
  duration?: string;
  description: string;
  location?: string;
  workSetting?: string | null;
};

type Education = {
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

type VolunteeringExperience = {
  role: string;
  organization: string;
  organizationProfileUrl?: string;
  Cause: string;
  startDate: string;
  endDate?: string;
  description: string;
};
