import { Form } from "@/components/ui/form";
import EducationFormFields from "./education-form-fields";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewEducationFormSchema,
  AddNewEducationFormValues,
} from "@/lib/editor-forms-schemas";
import { CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

const initialValues = {
  school: "",
  schoolPictureUrl: "",
  schoolProfileUrl: "",
  degree: "",
  fieldOfStudy: "",
  grade: "",
  description: "",
  activities: "",
};

export default function AddNewEducationForm({
  addToEducations,
  cancelButton,
}: {
  addToEducations: (data: AddNewEducationFormValues) => void;
  cancelButton: ReactNode;
}) {
  const formMethods = useForm<AddNewEducationFormValues>({
    resolver: zodResolver(addNewEducationFormSchema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const onSubmitNewEducation = (data: AddNewEducationFormValues) => {
    addToEducations(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitNewEducation)}>
        <div className="grid gap-4">
          <CardTitle>Add New Education</CardTitle>

          <EducationFormFields />

          <div className="flex gap-2 justify-end">
            {cancelButton}
            <Button type="submit" disabled={!isValid}>
              Add Education
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
