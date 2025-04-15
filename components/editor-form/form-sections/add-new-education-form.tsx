import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  addNewEducationFormSchema,
  AddNewEducationFormValues,
} from "@/lib/schemas/editor-forms-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import EducationFormFields from "./education-form-fields";

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
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: AddNewEducationFormValues) => void;
  onCancel: () => void;
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
    onSubmit(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmitNewEducation)}
        className="grid gap-4"
      >
        <EducationFormFields />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid}>
            Add Education
          </Button>
        </div>
      </form>
    </Form>
  );
}
