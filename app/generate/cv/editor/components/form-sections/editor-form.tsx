"use client";
import { useEffect, ReactNode } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { useProfileStore } from "@/hooks/use-profile";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

import type { ProfileData } from "@/lib/types";
import { useEditorTabStore } from "@/hooks/use-editor-tabs";
import { ChevronLeft, Save } from "lucide-react";
import { EditorTabName, editorTabName } from "@/config/editor-tabs";
import { capitalize } from "@/lib/utils";
import { isEqual } from "lodash";

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
  const profileData = useProfileStore((state) => state.profile);
  const setProfileData = useProfileStore((state) => state.setProfile);

  const activeTab = useEditorTabStore((state) => state.activeTab);
  const setActiveTab = useEditorTabStore((state) => state.setActiveTab);

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
        className="space-y-6"
      >
        <div className="flex gap-2 w-full items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            {capitalize(tabName)}
          </h2>

          <Button
            // type="submit"
            disabled={!canSave}
            variant="ghost"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            onClick={handleSubmit((data) => {
              submit(data, true);
            })}
          >
            <Save />
            {isDirty ? "Save" : "Saved"}
          </Button>
        </div>

        {children}
        <div
          className={`mt-6 flex ${
            !isFirstTab ? "justify-between" : "justify-end"
          }`}
        >
          {!isFirstTab && (
            <Button variant="outline" onClick={() => setActiveTab(previousTab)}>
              <ChevronLeft />
              Back
            </Button>
          )}
          {!isLastTab && (
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
              {isDirty && "Save & "}Next: {capitalize(nextTab)}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
