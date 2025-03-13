import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { positionSchema, PositionSchemaValues } from "../schemas";

import PositionFormFields from "./position-form-fields";

const initialValues = {
  title: "",
  location: "",
};

export default function AddNewPositionForm({
  addToPositions,
}: {
  addToPositions: (data: PositionSchemaValues) => void;
}) {
  const formMethods = useForm<PositionSchemaValues>({
    resolver: zodResolver(positionSchema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const onSubmitNewPosition = (data: PositionSchemaValues) => {
    addToPositions(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitNewPosition)}>
        <div className="grid gap-4">
          <h4 className="text-sm font-medium text-slate-700">
            Add New Position
          </h4>

          <PositionFormFields />

          <Button type="submit" className="w-full" disabled={!isValid}>
            Add Position
          </Button>
        </div>
      </form>
    </Form>
  );
}
