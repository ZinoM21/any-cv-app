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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { DrawerTrigger } from "../ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SignInDialog({
  trigger,
  onSuccess,
  customTitle,
  customDescription,
}: {
  trigger: ReactNode;
  onSuccess?: () => Promise<void>;
  customTitle?: string;
  customDescription?: string;
}) {
  const isMobile = useIsMobile();

  const [isOpen, setOpen] = useState(false);
  const [isOpenMobile, setOpenMobile] = useState(false);

  const title = customTitle || "Log in to BuiltAnyCV";
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
          <div className="p-4 border-t overflow-y-auto max-h-[calc(100vh-10rem)]">
            <SignInForm
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
      <DialogContent className="grid lg:grid-cols-2 max-w-fit lg:max-w-[700px] p-0">
        <div className="flex flex-col items-stretch gap-4 p-6">
          <DialogHeader className="flex flex-col items-center text-center">
            <DialogTitle className="text-2xl text-center">{title}</DialogTitle>
            <DialogDescription className="text-balance text-muted-foreground text-center max-w-72">
              {description}
            </DialogDescription>
          </DialogHeader>
          <SignInForm
            className="flex-1"
            redirect={false}
            onSuccess={async () => {
              setOpen(false);
              await onSuccess?.();
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
          <div className="absolute -top-12 flex items-center gap-2 self-center font-medium text-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FileUser className="size-4" />
            </div>
            <BuiltAnyCVLogo className="text-foreground" />
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
