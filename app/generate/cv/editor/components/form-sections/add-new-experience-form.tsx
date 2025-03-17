import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewExperienceFormSchema,
  AddNewExperienceFormValues,
} from "../editor-forms-schemas";
import ExperienceFormFields from "./experience-form-fields";
import { CardTitle } from "@/components/ui/card";

const initialValues = {
  company: "",
  companyProfileUrl: "",
  companyLogoUrl: "",
  positions: [
    {
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
      workSetting: "",
    },
  ],
};

export default function AddNewExperienceForm({
  addToExperiences,
}: {
  addToExperiences: (data: AddNewExperienceFormValues) => void;
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

          <Button type="submit" className="w-full" disabled={!isValid}>
            Add Experience
          </Button>
        </div>
      </form>
    </Form>
  );
}
