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

import { ProfileData } from "@/lib/types";
import { profileDataZ } from "@/lib/content";

interface EditorFormProps<T extends z.ZodSchema> {
  schema: T;
  initialValues: z.infer<T>;
  children: (methods: ReturnType<typeof useForm<z.infer<T>>>) => ReactNode;
  changeToNextTab: (value?: string) => void;
  activeTab: string;
  nextTabLabel: string;
  title: string;
}

export function EditorForm<T extends z.ZodTypeAny>({
  schema,
  initialValues,
  children,
  changeToNextTab,
  activeTab,
  nextTabLabel,
  title,
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

  useEffect(() => {
    if (profileData) {
      reset(initialValues);
    }
  }, [profileData, initialValues, reset]);

  const { mutateAsync: mutateProfileData } = useMutation({
    mutationFn: async (newValues: Partial<ProfileData>) => {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${profileData?.username}`,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(newValues),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to update profile");
      // }

      // return response.json();

      // simulate for dev:
      console.log(newValues);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //   throw new Error("Surprise!!");
      return profileDataZ;
    },
    onMutate: async (newValues) => {
      // Using this for optimistic updates
      // Snapshot the previous value
      const snapshot = { prevProfileData: profileData, previousTab: activeTab };
      console.log("SNAP", snapshot);

      // Optimistically update to the new value
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        ...newValues,
      }));

      // Optimistically change to next tab
      changeToNextTab();

      // Return a context with the previous data
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
    onError: (error, _, context) => {
      // If mutation fails, use context from onMutate to roll back
      setProfileData(context!.prevProfileData!);
      changeToNextTab(context?.previousTab);

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

      <Form {...formMethods}>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          {children(formMethods)}
          <div className="mt-6 flex justify-end">
            <Button type="submit">Next: {nextTabLabel}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
