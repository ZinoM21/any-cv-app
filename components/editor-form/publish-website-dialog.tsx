import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import type { ProfileData } from "@/lib/types";
import { Dispatch, ReactNode, SetStateAction } from "react";
import PublishForm from "./form-sections/publish-form";

export default function PublishWebsiteDialog({
  profile,
  trigger,
  open,
  setOpen,
  onSuccess
}: {
  profile: Partial<ProfileData>;
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
        <PublishForm profile={profile} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
