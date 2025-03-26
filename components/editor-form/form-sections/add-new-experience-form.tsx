import { ReactNode } from "react";

import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardTitle } from "@/components/ui/card";
import ExperienceFormFields from "./experience-form-fields";
import {
  addNewExperienceFormSchema,
  AddNewExperienceFormValues,
} from "@/lib/editor-forms-schemas";

const initialValues = {
  company: "",
  companyProfileUrl: "",
  companyLogoUrl: "",
  positions: [
    {
      title: "",
      duration: null,
      description: "",
      location: "",
      workSetting: "",
    },
  ],
};

export default function AddNewExperienceForm({
  addToExperiences,
  cancelButton,
}: {
  addToExperiences: (data: AddNewExperienceFormValues) => void;
  cancelButton: ReactNode;
}) {
  const formMethods = useForm<AddNewExperienceFormValues>({
    resolver: zodResolver(addNewExperienceFormSchema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const onSubmitNewExperience = (data: AddNewExperienceFormValues) => {
    addToExperiences(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitNewExperience)}>
        <div className="grid gap-4">
          <CardTitle>Add New Experience</CardTitle>

          <ExperienceFormFields />

          <div className="flex gap-2 justify-end">
            {cancelButton}
            <Button type="submit" disabled={!isValid}>
              Add Experience
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
