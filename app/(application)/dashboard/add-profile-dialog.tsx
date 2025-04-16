"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateProfileMutation } from "@/hooks/use-create-profile-mutation";
import { extractUsernameFromLinkedInUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUser, Linkedin, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addProfileFormSchema = z.object({
  username: z.string().min(1, "LinkedIn username is required"),
});

type AddProfileFormValues = z.infer<typeof addProfileFormSchema>;

export default function AddProfileDialog({
  trigger,
  onSuccess,
}: {
  trigger: ReactNode;
  onSuccess?: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<AddProfileFormValues>({
    resolver: zodResolver(addProfileFormSchema),
    defaultValues: {
      username: "",
    },
    mode: "all",
  });

  const { mutate, isPending } = useCreateProfileMutation();

  function onSubmit(values: AddProfileFormValues) {
    const username = extractUsernameFromLinkedInUrl(values.username);
    mutate(username, {
      onSuccess: async () => {
        toast.success("Profile created");
        setIsOpen(false);
        router.refresh(); // revalidate page -> must be done like this since NextJS's revalidatePath is not client-compatible
        await onSuccess?.();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-blue-600" />
            Import LinkedIn Profile
          </DialogTitle>
          <DialogDescription>
            Enter your LinkedIn username or profile URL to import your data.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 sm:flex-row"
            noValidate
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>LinkedIn Link or Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="linkedin.com/in/first-last"
                      className="bg-background"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-8 w-full sm:w-auto"
              disabled={isPending}
            >
              {isPending ? "Generating..." : "Generate"}
              {isPending ? <Loader2 className="animate-spin" /> : <FileUser />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
