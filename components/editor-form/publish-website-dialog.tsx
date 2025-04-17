import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import PublishForm, { PublishFormValues } from "./form-sections/publish-form";

export default function PublishWebsiteDialog({
  open,
  setOpen,
  onSubmit
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: PublishFormValues) => Promise<void>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Website</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This will publish your website to the public.
          </DialogDescription>
        </DialogHeader>
        <PublishForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
