"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { FileUser } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import BuildAnyCVLogo from "../logo";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "../ui/drawer";
import { SignUpForm } from "./signup-form";

export default function SignUpDialog({
  trigger,
  onSuccess,
  customTitle,
  customDescription
}: {
  trigger: ReactNode;
  onSuccess?: () => Promise<void>;
  customTitle?: string;
  customDescription?: string;
}) {
  console.log("in dialog", onSuccess);
  const isMobile = useIsMobile();

  const [isOpen, setOpen] = useState(false);
  const [isOpenMobile, setOpenMobile] = useState(false);

  const title = customTitle || "Create account";
  const description =
    customDescription || "Generate beautiful resumes and websites in seconds.";

  if (isMobile) {
    return (
      <Drawer open={isOpenMobile} onOpenChange={setOpenMobile}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="sm:max-w-[425px]">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[calc(100vh-10rem)] overflow-y-auto border-t p-4">
            <SignUpForm
              className="flex-1"
              redirect={false}
              onSuccess={async () => {
                setOpenMobile(false);
                await onSuccess?.();
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="grid max-w-fit p-0 lg:max-w-[700px] lg:grid-cols-2">
        <div className="flex flex-col items-stretch gap-4 p-6">
          <DialogHeader className="flex flex-col items-center text-center">
            <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
            <DialogDescription className="max-w-72 text-balance text-center text-muted-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>
          <SignUpForm
            className="flex-1"
            redirect={false}
            onSuccess={async () => {
              setOpen(false);
              await onSuccess?.();
            }}
          />
        </div>
        <div className="hidden rounded-r-lg lg:flex lg:items-center lg:bg-muted lg:px-20">
          <Image
            src="/svgs/undraw_update_resume.svg"
            alt="Signup Image"
            className="dark:brightness-[0.2] dark:grayscale"
            width={300}
            height={235}
          />
        </div>
        <div className="absolute -z-10 flex h-full w-full flex-col items-center rounded-lg">
          <div className="absolute -top-12 flex items-center gap-2 self-center font-medium text-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FileUser className="size-4" />
            </div>
            <BuildAnyCVLogo className="text-white" />
          </div>
          <div className="absolute -bottom-12 text-balance text-center text-xs text-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
