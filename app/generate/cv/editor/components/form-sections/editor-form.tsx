"use client";

import { useEffect, ReactNode } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { useShallow } from "zustand/react/shallow";
import { isEqual } from "lodash";

import { useProfileStore } from "@/hooks/use-profile";
import { useEditorTabStore } from "@/hooks/use-editor-tabs";

import { EditorTabName, editorTabName } from "@/config/editor-tab-names";

import type { ProfileData } from "@/lib/types";
import { capitalize } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { ChevronLeft, FileCheck, Save } from "lucide-react";

import DownloadCVButton from "@/components/download-cv-button";

interface EditorFormProps<T extends z.ZodSchema> {
  schema: T;
  initialValues: z.infer<T>;
  children: ReactNode;
  tabName: EditorTabName;
}

export function EditorForm<T extends z.ZodTypeAny>({
  schema,
  initialValues,
  children,
  tabName,
}: EditorFormProps<T>) {
  const [profileData, setProfileData] = useProfileStore(
    useShallow((state) => [state.profile, state.setProfile])
  );

  const [activeTab, setActiveTab] = useEditorTabStore(
    useShallow((state) => [state.activeTab, state.setActiveTab])
  );

  // Get ordered array of enum values
  const tabValues = Object.values(editorTabName);
  const tabIndex = tabValues.indexOf(activeTab as EditorTabName);
  const nextTab = tabValues[tabIndex + 1];
  const previousTab = tabValues[tabIndex - 1];
  const isFirstTab = tabIndex === 0;
  const isLastTab = tabIndex === tabValues.length - 1;

  const formMethods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    handleSubmit,
    formState: { dirtyFields, isDirty, isValid },
    reset,
  } = formMethods;

  const canSave = isDirty && isValid;

  const { mutateAsync: mutateProfileData } = useMutation({
    mutationFn: async (values: {
      newValues: Partial<ProfileData>;
      moveToNextTab: boolean;
    }) => {
      const { newValues } = values;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/profile/${profileData?.username}`,
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
    onSuccess: (fetchedValues: Partial<ProfileData>) => {
      // Revalidate & only update if mismatch bwtn fetched & optimistic data
      if (!isEqual(fetchedValues, profileData)) {
        setProfileData((optimisticProfileData) => ({
          ...optimisticProfileData,
          ...fetchedValues,
        }));
      }
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

  const submit = async (data: z.infer<T>, moveToNextTab: boolean = false) => {
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

  useEffect(() => {
    if (profileData) {
      reset(initialValues);
    }
  }, [profileData, initialValues, reset]);

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="flex flex-col h-full"
      >
        {/* Form Header */}
        <div className="flex gap-2 w-full items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {!isFirstTab && (
              <Button
                size="icon"
                variant="outline"
                onClick={() => setActiveTab(previousTab)}
                className="pl-2 pr-3"
              >
                <ChevronLeft />
              </Button>
            )}
            <h2 className="text-xl font-semibold text-slate-900">
              {capitalize(tabName)}
            </h2>
          </div>

          <div className="flex gap-2">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  // type="submit"
                  disabled={!canSave}
                  size="icon"
                  variant="outline"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  onClick={handleSubmit((data) => {
                    submit(data, false);
                  })}
                >
                  {isDirty ? <Save /> : <FileCheck />}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-secondary-foreground">
                <p>{isDirty ? "Save Changes" : "Changes are saved."}</p>
              </TooltipContent>
            </Tooltip>
            {isLastTab ? (
              <DownloadCVButton />
            ) : (
              <Button
                onClick={handleSubmit((data) => {
                  submit(data, true);
                })}
                disabled={!isValid}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit((data) => {
                      submit(data, true);
                    });
                  }
                }}
              >
                Next: {capitalize(nextTab)}
              </Button>
            )}
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1 min-h-0">{children}</div>
      </form>
    </Form>
  );
}
