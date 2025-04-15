import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import VolunteeringFormFields from "./volunteering-form-fields";

import {
  addNewVolunteeringFormSchema,
  AddNewVolunteeringFormValues,
} from "@/lib/schemas/editor-forms-schemas";

const initialValues = {
  role: "",
  organization: "",
  organizationProfileUrl: "",
  organizationLogoUrl: "",
  cause: "",
  description: "",
};

export default function AddNewVolunteeringForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: AddNewVolunteeringFormValues) => void;
  onCancel: () => void;
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
    onSubmit(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmitNewVolunteering)}
        className="grid gap-4"
      >
        <VolunteeringFormFields />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid}>
            Add Volunteering
          </Button>
        </div>
      </form>
    </Form>
  );
}
