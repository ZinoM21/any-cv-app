import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import ProjectFormFields from "./project-form-fields";
import {
  addNewProjectFormSchema,
  AddNewProjectFormValues,
} from "@/lib/editor-forms-schemas";

const initialValues = {
  title: "",
  startDate: undefined,
  endDate: undefined,
  description: "",
  url: "",
  associatedWith: "",
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
