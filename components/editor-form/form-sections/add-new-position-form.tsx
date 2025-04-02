"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  AddNewPositionFormValues,
  addNewPositionFormSchema,
} from "@/lib/editor-forms-schemas";

import PositionFormFields from "./position-form-fields";

const initialValues = {
  title: "",
  duration: null,
  description: "",
  location: "",
  workSetting: "",
};

export default function AddNewPositionForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: AddNewPositionFormValues) => void;
  onCancel: () => void;
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
    onSubmit(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitNewPosition)}>
        <div className="grid gap-4">
          <PositionFormFields />

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Add Position
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
