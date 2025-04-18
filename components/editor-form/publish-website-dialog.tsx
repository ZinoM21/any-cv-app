import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
import PublishForm from "./form-sections/publish-form";

export default function PublishWebsiteDialog({
  username,
  trigger,
  open,
  setOpen,
  onSuccess
}: {
  username: string;
  trigger?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess: (slug?: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Website</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This will publish your website to the public.
          </DialogDescription>
        </DialogHeader>
        <PublishForm username={username} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
