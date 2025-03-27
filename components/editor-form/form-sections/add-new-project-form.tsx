import { ReactNode } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardTitle } from "@/components/ui/card";
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
  addToProjects,
  cancelButton,
}: {
  addToProjects: (data: AddNewProjectFormValues) => void;
  cancelButton: ReactNode;
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
    addToProjects(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitNewProject)}>
        <div className="grid gap-4">
          <CardTitle>Add New Project</CardTitle>

          <ProjectFormFields />

          <div className="flex gap-2 justify-end">
            {cancelButton}
            <Button type="submit" disabled={!isValid}>
              Add Project
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
