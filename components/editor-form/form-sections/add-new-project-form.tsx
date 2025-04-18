import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  addNewProjectFormSchema,
  AddNewProjectFormValues,
} from "@/lib/schemas/editor-forms-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ProjectFormFields from "./project-form-fields";

const initialValues = {
  title: "",
  startDate: undefined,
  endDate: undefined,
  description: "",
  url: "",
  associatedWith: "",
  thumbnail: ""
};

export default function AddNewProjectForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: AddNewProjectFormValues) => void;
  onCancel: () => void;
}) {
  const formMethods = useForm<AddNewProjectFormValues>({
    resolver: zodResolver(addNewProjectFormSchema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const onSubmitNewProject = (data: AddNewProjectFormValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitNewProject)} className="grid gap-4">
        <ProjectFormFields />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid}>
            Add Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
