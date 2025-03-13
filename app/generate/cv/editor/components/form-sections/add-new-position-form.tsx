import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddNewPositionSchemaValues,
  addNewPositionSchema,
} from "../editor-forms-schemas";

import PositionFormFields from "./position-form-fields";
import { CardTitle } from "@/components/ui/card";

const initialValues = {
  title: "",
  location: "",
};

export default function AddNewPositionForm({
  addToPositions,
}: {
  addToPositions: (data: AddNewPositionSchemaValues) => void;
}) {
  const formMethods = useForm<AddNewPositionSchemaValues>({
    resolver: zodResolver(addNewPositionSchema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const onSubmitNewPosition = (data: AddNewPositionSchemaValues) => {
    addToPositions(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitNewPosition)}>
        <div className="grid gap-4">
          <CardTitle>Add New Position</CardTitle>

          <PositionFormFields />

          <Button type="submit" className="w-full" disabled={!isValid}>
            Add Position
          </Button>
        </div>
      </form>
    </Form>
  );
}
