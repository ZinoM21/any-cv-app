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
import { editorTabs, type EditorTab } from "@/config/editor-tabs";

interface EditorFormProps<T extends z.ZodSchema> {
  schema: T;
  initialValues: z.infer<T>;
  children: (methods: ReturnType<typeof useForm<z.infer<T>>>) => ReactNode;
  changeToNextTab: (value?: string) => void;
  activeTab: string;
  tab: EditorTab;
  tabIndex: number;
}

export function EditorForm<T extends z.ZodTypeAny>({
  schema,
  initialValues,
  children,
  changeToNextTab,
  activeTab,
  tab,
  tabIndex,
}: EditorFormProps<T>) {
  const profileData = useProfileStore((state) => state.profile);
  const setProfileData = useProfileStore((state) => state.setProfile);

  const formMethods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
    formState: { dirtyFields, isDirty },
    reset,
  } = formMethods;

  const { mutateAsync: mutateProfileData } = useMutation({
    mutationFn: async (newValues: Partial<ProfileData>) => {
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
    onMutate: async (newValues) => {
      // Capture current state for rollback
      const snapshot = { prevProfileData: profileData, previousTab: activeTab };

      // Optimistically update state & tab
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...newValues,
      }));
      changeToNextTab();

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
    onError: (error, _, snapshot) => {
      // Roll back optimistic update
      setProfileData(snapshot!.prevProfileData!);
      changeToNextTab(snapshot?.previousTab);

      console.error(error);
      toast.error(error.message);
    },
  });

  const submit = async (data: z.infer<T>) => {
    if (isDirty) {
      const values = Object.keys(dirtyFields).reduce((fields, key) => {
        const fieldKey = key as keyof typeof data;
        return {
          ...fields,
          [fieldKey]: data[fieldKey],
        };
      }, {});

      await mutateProfileData(values);
    }

    changeToNextTab();
  };

  const isFirstTab = tabIndex === 0;
  const isLastTab = tabIndex === editorTabs.length - 1;

  useEffect(() => {
    if (profileData) {
      reset(initialValues);
    }
  }, [profileData, initialValues, reset]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">{tab.label}</h2>

      <Form {...formMethods}>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          {children(formMethods)}

          <div
            className={`mt-6 flex ${
              !isFirstTab ? "justify-between" : "justify-end"
            }`}
          >
            {!isFirstTab && (
              <Button
                variant="outline"
                onClick={() => changeToNextTab(editorTabs[tabIndex - 1].name)}
              >
                Back
              </Button>
            )}
            {!isLastTab && (
              <Button type="submit">
                Save & Next: {editorTabs[tabIndex + 1]?.label}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
