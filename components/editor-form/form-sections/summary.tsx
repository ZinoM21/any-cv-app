"use client";

import { Separator } from "@/components/ui/separator";
import { EditorTabName } from "@/config/editor-tab-names";
import { useEditorFormInitialValues } from "@/hooks/use-form-initial-values";
import { editSummaryFormSchema } from "@/lib/schemas/editor-forms-schemas";
import { EditorForm } from "../editor-form";
import { ContactInfoFormFields } from "./contact-form-fields";
import { SummaryFormFields } from "./summary-form-fields";

export function SummaryForm({ tabName }: { tabName: EditorTabName }) {
  const { getSummaryInitialValues } = useEditorFormInitialValues();
  const initialValues = getSummaryInitialValues();

  return (
    <EditorForm
      schema={editSummaryFormSchema}
      initialValues={initialValues}
      tabName={tabName}
    >
      <div className="grid gap-4 mb-60 mx-0.5">
        <SummaryFormFields />

        <Separator className="mt-4" />

        <h3 className="font-medium">Contact Information</h3>
        <ContactInfoFormFields />
      </div>
    </EditorForm>
  );
}
