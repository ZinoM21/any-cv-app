import { useProfileStore } from "./use-profile";
import {
  EditEducationFormValues,
  EditSummaryFormValues,
  EditExperiencesFormValues,
  EditSkillsFormValues,
  EditVolunteeringFormValues,
} from "@/app/generate/cv/editor/components/editor-forms-schemas";

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
          startDate: new Date(edu.startDate),
          endDate: edu.endDate && new Date(edu.endDate),
          grade: edu.grade || "",
          activities: edu.activities || "",
          description: edu.description || "",
        }))) ||
      [],
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
                  startDate: new Date(pos.startDate),
                  endDate: pos.endDate && new Date(pos.endDate),
                  duration: pos.duration,
                  description: pos.description || "",
                  location: pos.location || "",
                  workSetting: pos.workSetting || "",
                }))
              : [
                  {
                    title: "",
                    startDate: new Date(),
                    duration: null,
                    description: "",
                    location: "",
                    workSetting: "",
                  },
                ]) || [],
        }))) ||
      [],
  });

  /**
   * Get initial values for Skills form
   */
  const getSkillsInitialValues = (): EditSkillsFormValues => ({
    skills: profileData?.skills || [],
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
          startDate: vol.startDate,
          endDate: vol.endDate && new Date(vol.endDate),
          description: vol.description || "",
          organizationProfileUrl: vol.organizationProfileUrl || "",
          organizationLogoUrl: vol.organizationLogoUrl || "",
          cause: vol.cause || "",
        }))) ||
      [],
  });

  return {
    getSummaryInitialValues,
    getEducationInitialValues,
    getExperienceInitialValues,
    getSkillsInitialValues,
    getVolunteeringInitialValues,
  };
};
