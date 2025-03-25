import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FileDown, FileUser } from "lucide-react";

import { usePdfPlugins } from "@/hooks/use-pdf-plugins";
import useSession from "@/hooks/use-session";
import { SignInForm } from "@/app/signin/components/login-form";
import BuiltAnyCVLogo from "./logo";
import { useState } from "react";
import { toast } from "sonner";

const DownloadButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <FileDown className="mr-1" />
      Download CV
    </Button>
  );
};

export default function DownloadCVButton() {
  const [isOpen, setOpen] = useState(false);
  const { Download } = usePdfPlugins();

  const { isSignedIn } = useSession();

  const onSuccessDownload = () => {
    toast.success("Done! Check your downloads folder.");
  };

  return (
    <Download>
      {({ onClick: downloadCV }) => {
        return isSignedIn ? (
          <DownloadButton
            onClick={() => {
              downloadCV();
              onSuccessDownload();
            }}
          />
        ) : (
          <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <DownloadButton />
            </DialogTrigger>
            <DialogContent className="flex flex-col items-stretch w-96 gap-4">
              <DialogHeader className="flex flex-col items-center text-center">
                <DialogTitle className="text-2xl">Welcome back</DialogTitle>
                <DialogDescription className="text-balance text-muted-foreground text-center max-w-72">
                  Login to your builtanycv account to download your new CV.
                </DialogDescription>
              </DialogHeader>
              <SignInForm
                className="flex-1"
                redirect={false}
                onSuccess={() => {
                  setOpen(false);
                  downloadCV();
                  onSuccessDownload();
                }}
              />
              <div className="absolute -top-12 flex items-center gap-2 self-center font-medium text-white">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <FileUser className="size-4" />
                </div>
                <BuiltAnyCVLogo className="text-white" />
              </div>
            </DialogContent>
          </Dialog>
        );
      }}
    </Download>
  );
}
