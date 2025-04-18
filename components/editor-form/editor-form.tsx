"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useShallow } from "zustand/react/shallow";

import { useEditorTabStore } from "@/hooks/use-editor-tabs";
import { useProfileStore } from "@/hooks/use-profile";

import { EditorTabName, editorTabName } from "@/config/editor-tab-names";

import { capitalize } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { ArrowLeft, FileCheck, Save } from "lucide-react";

import { useOptimisticProfileUpdateMutation } from "@/hooks/use-optimistic-profile-update-mutation";
import EditorFinalActionButton from "./editor-final-action-button";

interface EditorFormProps<T extends z.ZodSchema> {
  schema: T;
  initialValues: z.infer<T>;
  children: React.ReactElement;
  tabName: EditorTabName;
}

/**
 * Creates a generic react-hook-form which handles submission, validation and navigation between form tabs.
 * Wrap it around form fields to create a form.
 * @param schema - Zod schema for form validation
 * @param initialValues - Initial values for form fields
 * @param children - A ReactNode including form fields
 * @param tabName - Name of the tab it belongs to
 */
export function EditorForm<T extends z.ZodTypeAny>({
  schema,
  initialValues,
  children,
  tabName
}: EditorFormProps<T>) {
  const profileData = useProfileStore((state) => state.profile);

  const [activeTab, setActiveTab] = useEditorTabStore(
    useShallow((state) => [state.activeTab, state.setActiveTab])
  );

  // Get ordered array of enum values
  const tabValues = Object.values(editorTabName);
  const activeTabIndex = tabValues.indexOf(activeTab as EditorTabName);
  const nextTab = tabValues[activeTabIndex + 1];
  const previousTab = tabValues[activeTabIndex - 1];
  const isFirstTab = activeTabIndex === 0;
  const isLastTab = activeTabIndex === tabValues.length - 1;

  const formMethods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "all"
  });

  const {
    handleSubmit,
    formState: { dirtyFields, isDirty, isValid },
    reset
  } = formMethods;

  const canSave = isDirty && isValid;

  const { mutateAsync: optimisticUpdateProfileData } =
    useOptimisticProfileUpdateMutation();

  const submit = async (data: z.infer<T>) => {
    // Move to next tab (is optimitic when mutation happens)
    if (isDirty) {
      const values = Object.keys(dirtyFields).reduce((fields, key) => {
        const fieldKey = key as keyof typeof data;
        return {
          ...fields,
          [fieldKey]: data[fieldKey]
        };
      }, {});

      await optimisticUpdateProfileData({
        newValues: values,
        currentTab: activeTab
      });
    }
  };

  useEffect(() => {
    // Cannot use default "values" prop for state management in useForm because profileData conflicts with form schema
    // Therefore, use reset() to update values when profileData changes
    if (profileData) {
      reset(initialValues);
    }
  }, [profileData, initialValues, reset]);

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit((data) => submit(data))}
        className="flex h-full flex-col gap-4 sm:gap-6"
      >
        {/* Form Header */}
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {!isFirstTab && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setActiveTab(previousTab)}
              >
                <ArrowLeft />
              </Button>
            )}
            <h2 className="text-xl font-semibold">{capitalize(tabName)}</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!canSave}
                  size="icon"
                  variant="ghost"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  onClick={handleSubmit((data) => {
                    submit(data);
                  })}
                >
                  {isDirty ? (
                    <Save className="text-primary" />
                  ) : (
                    <FileCheck className="text-green-500" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isDirty ? "Save Changes" : "Changes are saved."}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex gap-2">
            {isLastTab ? (
              <EditorFinalActionButton username={profileData!.username!} />
            ) : (
              <Button
                onClick={handleSubmit((data) => {
                  submit(data);
                  setActiveTab(nextTab);
                })}
                disabled={!isValid}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit((data) => {
                      submit(data);
                      setActiveTab(nextTab);
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
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </form>
    </Form>
  );
}
