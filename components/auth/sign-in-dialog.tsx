"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FileUser } from "lucide-react";

import { SignInForm } from "@/app/signin/components/login-form";
import BuiltAnyCVLogo from "../logo";
import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignInDialog({
  trigger,
  onSuccess,
  customTitle,
  customDescription,
}: {
  trigger: ReactNode;
  onSuccess?: () => void;
  customTitle?: string;
  customDescription?: string;
}) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="grid lg:grid-cols-2 max-w-fit p-0">
        <div className="flex flex-col items-stretch gap-4 p-6">
          <DialogHeader className="flex flex-col items-center text-center">
            <DialogTitle className="text-2xl">
              {customTitle || "Log in to BuiltAnyCV"}
            </DialogTitle>
            <DialogDescription className="text-balance text-muted-foreground text-center max-w-72">
              {customDescription ||
                "Generate beautiful resumes and websites in seconds."}
            </DialogDescription>
          </DialogHeader>
          <SignInForm
            className="flex-1"
            redirect={false}
            onSuccess={() => {
              setOpen(false);
              onSuccess?.();
            }}
          />
        </div>
        <div className="hidden lg:flex lg:items-center lg:bg-muted lg:px-20 rounded-lg">
          <Image
            src="/svgs/undraw_update_resume.svg"
            alt="Login Image"
            className="dark:brightness-[0.2] dark:grayscale"
            width={300}
            height={235}
          />
        </div>
        <div className="absolute w-full h-full flex flex-col items-center rounded-lg -z-10">
          <div className="absolute -top-12 flex items-center gap-2 self-center font-medium text-white">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FileUser className="size-4" />
            </div>
            <BuiltAnyCVLogo className="text-white" />
          </div>
          <div className="absolute -bottom-12 text-balance text-center text-xs text-white [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
