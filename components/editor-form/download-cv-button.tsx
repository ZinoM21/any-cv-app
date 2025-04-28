import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

import { usePdfPlugins } from "@/hooks/use-pdf-plugins";
import useSession from "@/hooks/use-session";
import { toast } from "sonner";
import SignUpDialog from "../auth/sign-up-dialog";

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

export default function DownloadCVButton({
  onSuccess
}: {
  onSuccess?: () => void;
}) {
  const { Download } = usePdfPlugins();

  const { isSignedIn } = useSession();

  const onDownloadSuccess = () => {
    toast.success("Done! Check your downloads folder.");

    setTimeout(() => {
      onSuccess?.();
    }, 500);
  };

  return (
    <Download>
      {({ onClick: downloadCV }) => {
        return isSignedIn ? (
          <DownloadButton
            onClick={() => {
              downloadCV();
              onDownloadSuccess();
            }}
          />
        ) : (
          <SignUpDialog
            trigger={<DownloadButton />}
            onSuccess={async () => {
              downloadCV();
              onDownloadSuccess();
            }}
            customTitle="Create account to download your CV"
            customDescription="Please enter your credentials to get your CV."
          />
        );
      }}
    </Download>
  );
}
