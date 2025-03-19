import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddNewPositionFormValues,
  addNewPositionFormSchema,
} from "../editor-forms-schemas";

import PositionFormFields from "./position-form-fields";
import { CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

const initialValues = {
  title: "",
  duration: null,
  description: "",
  location: "",
  workSetting: "",
};

export default function AddNewPositionForm({
  addToPositions,
  cancelButton,
}: {
  addToPositions: (data: AddNewPositionFormValues) => void;
  cancelButton: ReactNode;
}) {
  const formMethods = useForm<AddNewPositionFormValues>({
    resolver: zodResolver(addNewPositionFormSchema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const onSubmitNewPosition = (data: AddNewPositionFormValues) => {
    addToPositions(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitNewPosition)}>
        <div className="grid gap-4">
          <CardTitle>Add New Position</CardTitle>

          <PositionFormFields />

          <div className="flex gap-2 justify-end">
            {cancelButton}
            <Button type="submit" disabled={!isValid}>
              Add Position
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
