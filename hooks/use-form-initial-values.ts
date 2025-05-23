import {
  EditEducationFormValues,
  EditExperiencesFormValues,
  EditProjectsFormValues,
  EditSkillsFormValues,
  EditSummaryFormValues,
  EditVolunteeringFormValues
} from "@/lib/schemas/editor-forms-schemas";
import { useProfileStore } from "./use-profile";

/**
 * Custom hook to generate initial values for CV editor forms
 * This centralizes the logic for creating form initial values from profile data
 */
export const useEditorFormInitialValues = () => {
  const profileData = useProfileStore((state) => state.profile);

  /**
   * Get initial values for Summary form
   */
  const getSummaryInitialValues = (): EditSummaryFormValues => ({
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    headline: profileData?.headline || "",
    about: profileData?.about || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    website: profileData?.website || "",
    location: profileData?.location || "",
    languages: profileData?.languages || [],
    profilePictureUrl: profileData?.profilePictureUrl || ""
  });

  /**
   * Get initial values for Education form
   */
  const getEducationInitialValues = (): EditEducationFormValues => ({
    education:
      (profileData?.education &&
        profileData.education.map((edu) => ({
          school: edu.school,
          schoolPictureUrl: edu.schoolPictureUrl || "",
          schoolProfileUrl: edu.schoolProfileUrl || "",
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy || "",
          startDate: edu.startDate && new Date(edu.startDate),
          endDate: edu.endDate && new Date(edu.endDate),
          grade: edu.grade || "",
          activities: edu.activities || "",
          description: edu.description || ""
        }))) ||
      []
  });

  /**
   * Get initial values for Experience form
   */
  const getExperienceInitialValues = (): EditExperiencesFormValues => ({
    experiences:
      (profileData?.experiences &&
        profileData.experiences.map((exp) => ({
          company: exp.company,
          companyProfileUrl: exp.companyProfileUrl || "",
          companyLogoUrl: exp.companyLogoUrl || "",
          positions:
            (exp.positions
              ? exp.positions.map((pos) => ({
                  title: pos.title,
                  startDate: pos.startDate && new Date(pos.startDate),
                  endDate: pos.endDate && new Date(pos.endDate),
                  duration: pos.duration,
                  description: pos.description || "",
                  location: pos.location || "",
                  workSetting: pos.workSetting || ""
                }))
              : [
                  {
                    title: "",
                    startDate: new Date(),
                    duration: null,
                    description: "",
                    location: "",
                    workSetting: ""
                  }
                ]) || []
        }))) ||
      []
  });

  /**
   * Get initial values for Skills form
   */
  const getSkillsInitialValues = (): EditSkillsFormValues => ({
    skills: profileData?.skills || []
  });

  /**
   * Get initial values for Volunteering form
   */
  const getVolunteeringInitialValues = (): EditVolunteeringFormValues => ({
    volunteering:
      (profileData?.volunteering &&
        profileData?.volunteering.map((vol) => ({
          organization: vol.organization,
          role: vol.role,
          startDate: vol.startDate && new Date(vol.startDate),
          endDate: vol.endDate && new Date(vol.endDate),
          description: vol.description || "",
          organizationProfileUrl: vol.organizationProfileUrl || "",
          organizationLogoUrl: vol.organizationLogoUrl || "",
          cause: vol.cause || ""
        }))) ||
      []
  });

  /**
   * Get initial values for Projects form
   */
  const getProjectsInitialValues = (): EditProjectsFormValues => {
    return {
      projects: profileData?.projects
        ? profileData.projects.map((project) => ({
            title: project.title,
            startDate: project.startDate && new Date(project.startDate),
            endDate: project.endDate && new Date(project.endDate),
            description: project.description || "",
            url: project.url || "",
            associatedWith: project.associatedWith || "",
            thumbnail: project.thumbnail || ""
          }))
        : []
    };
  };

  return {
    getSummaryInitialValues,
    getEducationInitialValues,
    getExperienceInitialValues,
    getSkillsInitialValues,
    getVolunteeringInitialValues,
    getProjectsInitialValues
  };
};
