"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteProfile } from "@/hooks/use-delete-profile";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteProfileDialogProps {
  username: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function DeleteProfileDialog({
  username,
  open,
  setIsOpen
}: DeleteProfileDialogProps) {
  const { mutateAsync, isPending } = useDeleteProfile(username);
  const router = useRouter();

  const handleDelete = async () => {
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success("Profile deleted successfully");
        router.refresh(); // revalidate page / query -> must be done like this since NextJS's revalidatePath is not client-compatible
        setIsOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete profile");
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            profile and all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Deleting..." : "Yes, delete profile"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
