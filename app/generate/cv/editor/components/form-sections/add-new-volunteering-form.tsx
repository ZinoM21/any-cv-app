import { Form } from "@/components/ui/form";
import VolunteeringFormFields from "./volunteering-form-fields";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewVolunteeringFormSchema,
  AddNewVolunteeringFormValues,
} from "../editor-forms-schemas";
import { CardTitle } from "@/components/ui/card";

const initialValues = {
  role: "",
  organization: "",
  organizationProfileUrl: "",
  startDate: "",
  endDate: "",
  cause: "",
  description: "",
};

export default function AddNewVolunteeringForm({
  addToVolunteering,
}: {
  addToVolunteering: (data: AddNewVolunteeringFormValues) => void;
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

          <Button type="submit" className="w-full" disabled={!isValid}>
            Add Volunteering
          </Button>
        </div>
      </form>
    </Form>
  );
}
