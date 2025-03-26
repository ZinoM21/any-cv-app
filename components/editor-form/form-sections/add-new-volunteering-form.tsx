import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import VolunteeringFormFields from "./volunteering-form-fields";

import {
  addNewVolunteeringFormSchema,
  AddNewVolunteeringFormValues,
} from "@/lib/editor-forms-schemas";

const initialValues = {
  role: "",
  organization: "",
  organizationProfileUrl: "",
  organizationLogoUrl: "",
  cause: "",
  description: "",
};

export default function AddNewVolunteeringForm({
  addToVolunteering,
  cancelButton,
}: {
  addToVolunteering: (data: AddNewVolunteeringFormValues) => void;
  cancelButton: ReactNode;
}) {
  const formMethods = useForm<AddNewVolunteeringFormValues>({
    resolver: zodResolver(addNewVolunteeringFormSchema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const onSubmitNewVolunteering = (data: AddNewVolunteeringFormValues) => {
    addToVolunteering(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitNewVolunteering)}>
        <div className="grid gap-4">
          <CardTitle>Add New Volunteering</CardTitle>

          <VolunteeringFormFields />

          <div className="flex gap-2 justify-end">
            {cancelButton}
            <Button type="submit" disabled={!isValid}>
              Add Volunteering
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
