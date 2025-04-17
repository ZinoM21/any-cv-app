"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buildQueryString } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export default function SuggestNextActionDialog({
  nextAction,
  isOpen,
  setOpen,
  websiteUrl,
}: {
  nextAction?: "cv" | "website";
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  websiteUrl?: string;
}) {
  const searchParams = useSearchParams();
  const searchParamsString = buildQueryString(searchParams);

  const [copied, setCopied] = useState(false);

  const suggestCV = nextAction === "cv";

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {suggestCV
              ? "Website published successfully!"
              : "CV downloaded successfully!"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {suggestCV
              ? "Your personal website is now live and accessible at the URL below. Share it with your audience!"
              : "Your CV has been downloaded to your downloads folder. Share it with your audience!"}
          </DialogDescription>
        </DialogHeader>
        {suggestCV && websiteUrl && (
          <>
            <div>
              <div className="flex items-center space-x-2">
                <Input
                  value={websiteUrl}
                  readOnly
                  className="flex-1"
                  onClick={(e) => e.currentTarget.select()}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyUrl(websiteUrl)}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {copied ? "Copied" : "Copy URL"}
                  </span>
                </Button>
                <Button asChild>
                  <Link href={websiteUrl}>
                    <ExternalLink className="size-4" />
                    Visit site
                  </Link>
                </Button>
              </div>
              {copied && (
                <p className="mt-2 text-xs text-green-600">
                  URL copied to clipboard!
                </p>
              )}
            </div>

            <Separator className="my-2" />
          </>
        )}
        <Button
          variant="outline"
          className="h-fit p-6 group flex flex-col items-center justify-center text-center shadow-sm hover:shadow transition-all"
          asChild
        >
          <Link href={`/generate/${nextAction}/template${searchParamsString}`}>
            <div
              className={`mb-3 rounded-full bg-${
                suggestCV ? "blue" : "purple"
              }-100 p-3`}
            >
              {suggestCV ? (
                <FileText className="h-6 w-6 text-blue-600" />
              ) : (
                <Globe className="h-6 w-6 text-purple-600" />
              )}
            </div>
            <h3 className="mb-1 font-medium  ">
              Complete your professional presence
            </h3>
            <p className="mb-3 text-sm text-muted-foreground text-balance">
              {suggestCV
                ? "Now that your website is live, why not create a professional CV to complement it? Our CV builder makes it easy to create a polished resume in seconds."
                : "Now that you downloaded your CV, why not create a personal website to complement it? Our website builder makes it easy to create a polished website in seconds."}
            </p>
            <span
              className={`inline-flex items-center text-sm font-medium text-${
                suggestCV ? "blue" : "purple"
              }-600`}
            >
              Generate {suggestCV ? "CV" : "website"}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
