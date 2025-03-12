"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Save } from "lucide-react";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

import { EditorTab, editorTabs } from "@/config/editor-tabs";
import { useProfileStore } from "@/hooks/use-profile";
import type { ProfileData } from "@/lib/types";

// Define the form schema for all sections
const formSchema = z.object({
  // Summary section
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  headline: z.string().optional(),
  about: z.string().optional(),

  // Experience section
  experiences: z
    .array(
      z.object({
        company: z.string(),
        companyProfileUrl: z.string().optional(),
        companyLogoUrl: z.string().optional(),
        positions: z.array(
          z.object({
            title: z.string(),
            location: z.string().optional(),
            locationType: z.string().optional(),
            startDate: z.string(),
            endDate: z.string().optional(),
            description: z.string().optional(),
          })
        ),
      })
    )
    .optional(),

  // Education section
  education: z
    .array(
      z.object({
        school: z.string(),
        degree: z.string().optional(),
        field: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),

  // Skills section
  skills: z.array(z.string()).optional(),

  // Volunteering section
  volunteering: z
    .array(
      z.object({
        role: z.string(),
        organization: z.string(),
        cause: z.string(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
});

const positionSchema = z.object({
  title: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  workSetting: z.string().optional().nullable(),
});

const experienceSchema = z.object({
  company: z.string(),
  companyProfileUrl: z.string().optional(),
  companyLogoUrl: z.string().optional(),
  positions: z.array(positionSchema),
});

function getFormSchema(activeTab: EditorTab["name"]) {
  switch (activeTab) {
    default:
    case editorTabs[0].name:
      return z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        headline: z.string().optional(),
        about: z.string().optional(),
      });

    case editorTabs[1].name:
      return z.object({
        experiences: z.array(experienceSchema),
      });

    case editorTabs[2].name:
      return z.object({
        education: z.array(
          z.object({
            school: z.string(),
            degree: z.string().optional(),
            grade: z.string().optional(),
            fieldOfStudy: z.string().optional(),
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            description: z.string().optional(),
            activities: z.string().optional(),
            schoolPictureUrl: z.string().optional(),
            schoolProfileUrl: z.string().optional(),
          })
        ),
      });

    case editorTabs[3].name:
      return z.object({
        skills: z.array(z.string()),
      });

    case editorTabs[4].name:
      return z.object({
        volunteering: z.array(
          z.object({
            role: z.string(),
            organization: z.string(),
            organizationProfileUrl: z.string().optional(),
            cause: z.string(),
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            description: z.string().optional(),
          })
        ),
      });
  }
}

function getInitialValues(
  activeTab: EditorTab["name"],
  profileData: Partial<ProfileData> | null
): Record<string, unknown> {
  switch (activeTab) {
    default:
    case editorTabs[0].name:
      return {
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        headline: profileData?.headline || "",
        about: profileData?.about || "",
      };

    case editorTabs[1].name:
      return {
        experiences:
          (profileData?.experiences &&
            profileData.experiences.map((exp) => ({
              company: exp.company || "",
              companyProfileUrl: exp.companyProfileUrl || "",
              companyLogoUrl: exp.companyLogoUrl || "",
              positions:
                (exp.positions &&
                  exp.positions.map((pos) => ({
                    title: pos.title || "",
                    location: pos.location || "",
                    startDate: pos.startDate || "",
                    endDate: pos.endDate || "",
                    description: pos.description || "",
                    workSetting: pos.workSetting || "",
                  }))) ||
                [],
            }))) ||
          [],
      };

    case editorTabs[2].name:
      return {
        education:
          (profileData?.education &&
            profileData.education.map((edu) => ({
              school: edu.school || "",
              degree: edu.degree || "",
              grade: edu.grade || "",
              fieldOfStudy: edu.fieldOfStudy || "",
              startDate: edu.startDate || "",
              endDate: edu.endDate || "",
              description: edu.description || "",
              activities: edu.activities || "",
              schoolPictureUrl: edu.schoolPictureUrl || "",
              schoolProfileUrl: edu.schoolProfileUrl || "",
            }))) ||
          [],
      };

    case editorTabs[3].name:
      return {
        skills: profileData?.skills || [],
      };

    case editorTabs[4].name:
      return {
        volunteering:
          (profileData?.volunteering &&
            profileData.volunteering.map((vol) => ({
              role: vol.role || "",
              organization: vol.organization || "",
              organizationProfileUrl: vol.organizationProfileUrl || "",
              cause: vol.cause || "",
              startDate: vol.startDate || "",
              endDate: vol.endDate || "",
              description: vol.description || "",
            }))) ||
          [],
      };
  }
}

export function CVEditorForm({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState(editorTabs[0].name);
  const profileData = useProfileStore((state) => state.profile);
  const setProfileData = useProfileStore((state) => state.setProfile);
  // const formSchema = getFormSchema(activeTab);

  const initialValues = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    headline: profileData?.headline || "",
    about: profileData?.about || "",
    experiences:
      (profileData?.experiences &&
        profileData.experiences.map((exp) => ({
          company: exp.company || "",
          companyProfileUrl: exp.companyProfileUrl || "",
          companyLogoUrl: exp.companyLogoUrl || "",
          positions:
            (exp.positions &&
              exp.positions.map((pos) => ({
                title: pos.title || "",
                location: pos.location || "",
                startDate: pos.startDate || "",
                endDate: pos.endDate || "",
                description: pos.description || "",
              }))) ||
            [],
        }))) ||
      [],
    education: profileData?.education || [],
    skills: profileData?.skills || [],
    volunteering: profileData?.volunteering || [],
  };

  // const initialValues = getInitialValues(activeTab, profileData);

  const formMethods = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
    formState: { dirtyFields, isDirty, isValid },
    reset,
  } = formMethods;

  const tabIndex = editorTabs.findIndex((t) => t.name === activeTab);
  const nextTab = editorTabs[tabIndex + 1].name;
  const isFirstTab = tabIndex === 0;
  const isLastTab = tabIndex === editorTabs.length - 1;

  const { mutateAsync: mutateProfileData } = useMutation({
    mutationFn: async (values: {
      newValues: Partial<ProfileData>;
      moveToNextTab: boolean;
    }) => {
      const { newValues } = values;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${profileData?.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      return response.json();
    },
    onMutate: async ({ newValues, moveToNextTab }) => {
      // Capture current state for rollback
      const snapshot = { prevProfileData: profileData, previousTab: activeTab };

      // Optimistically update state & tab
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...newValues,
      }));
      if (moveToNextTab) {
        setActiveTab(nextTab);
      }

      return snapshot;
    },
    onSuccess: (newValues: Partial<ProfileData>) => {
      // Revalidate (hopefully always same as optimistic)
      // Could show toast here if there's a mismatch
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...newValues,
      }));
    },
    onError: (error, values, snapshot) => {
      // Roll back optimistic update
      if (snapshot) {
        setProfileData(snapshot.prevProfileData as ProfileData);

        if (values.moveToNextTab) {
          setActiveTab(snapshot.previousTab);
        }
      }

      console.error(error);
      toast.error(error.message);
    },
  });

  const submit = async (
    data: z.infer<typeof formSchema>,
    moveToNextTab: boolean = false
  ) => {
    if (isDirty) {
      const values = Object.keys(dirtyFields).reduce((fields, key) => {
        const fieldKey = key as keyof typeof data;
        return {
          ...fields,
          [fieldKey]: data[fieldKey],
        };
      }, {});

      await mutateProfileData({ newValues: values, moveToNextTab });
    } else if (moveToNextTab) {
      setActiveTab(nextTab);
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Downloading PDF...");
  };

  useEffect(() => {
    if (profileData) {
      reset(initialValues);
    }
  }, [profileData]);

  return (
    <div className="flex h-full flex-col border-r">
      {/* Header */}
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(async (data) => submit(data))}>
          <div className="z-10 flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Link
                href={`/generate/cv/template?username=${username}`}
                className="rounded-full p-1 hover:bg-slate-100"
              >
                <ArrowLeft className="size-5" />
              </Link>
              <h1 className="text-xl font-semibold text-slate-900">
                Edit Your CV
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleDownload}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button type="submit" disabled={!isDirty || !isValid}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 w-full">
                  {editorTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.name}
                      value={tab.name}
                      className="grow min-w-0 px-1"
                    >
                      <span className="overflow-hidden text-ellipsis">
                        {tab.label}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {editorTabs.map((tab) => (
                  <TabsContent key={tab.name} value={tab.name}>
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-slate-900">
                        {tab.label}
                      </h2>
                      <tab.FormComponent />
                      <div
                        className={`mt-6 flex ${
                          !isFirstTab ? "justify-between" : "justify-end"
                        }`}
                      >
                        {!isFirstTab && (
                          <Button
                            variant="outline"
                            onClick={() =>
                              setActiveTab(editorTabs[tabIndex - 1].name)
                            }
                          >
                            Back
                          </Button>
                        )}
                        {!isLastTab && (
                          <Button
                            onClick={handleSubmit((data) => {
                              submit(data, true);
                            })}
                            disabled={!isValid}
                          >
                            {isDirty && "Save & "}Next:{" "}
                            {editorTabs[tabIndex + 1]?.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
