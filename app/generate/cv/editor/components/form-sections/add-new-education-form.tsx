import { Form } from "@/components/ui/form";
import EducationFormFields from "./education-form-fields";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewEducationFormSchema,
  AddNewEducationFormValues,
} from "../schemas";

const initialValues = {
  school: "",
  degree: "",
  startDate: "",
};

export default function AddNewEducationForm({
  addToEducations,
}: {
  addToEducations: (data: AddNewEducationFormValues) => void;
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
          <h4 className="text-sm font-medium text-slate-700">
            Add New Education
          </h4>

          <EducationFormFields />

          <Button type="submit" className="w-full" disabled={!isValid}>
            Add Education
          </Button>
        </div>
      </form>
    </Form>
  );
}
