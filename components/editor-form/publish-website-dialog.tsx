import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import PublishForm from "./form-sections/publish-form";

export default function PublishWebsiteDialog({
  open,
  setOpen,
  onSuccess
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess: (slug?: string) => void;
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
        <PublishForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
