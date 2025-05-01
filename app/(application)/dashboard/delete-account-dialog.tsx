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
import { useApi } from "@/hooks/use-api";
import { deleteUser } from "@/lib/api/api";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

interface DeleteAccountDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function DeleteAccountDialog({
  open,
  setIsOpen
}: DeleteAccountDialogProps) {
  const api = useApi();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => deleteUser(api),
    onSuccess: async () => {
      toast.success("Account deleted successfully");
      setIsOpen(false);
      await signOut({ redirectTo: "/" });
    },
    onError: () => {
      toast.error("Failed to delete account");
    }
  });

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
            onClick={async () => await mutateAsync()}
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
