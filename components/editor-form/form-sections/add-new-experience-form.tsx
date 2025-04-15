import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  addNewExperienceFormSchema,
  AddNewExperienceFormValues,
} from "@/lib/schemas/editor-forms-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ExperienceFormFields from "./experience-form-fields";

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
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: AddNewExperienceFormValues) => void;
  onCancel: () => void;
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
    onSubmit(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmitNewExperience)}
        className="grid gap-4"
      >
        <ExperienceFormFields />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid}>
            Add Experience
          </Button>
        </div>
      </form>
    </Form>
  );
}
