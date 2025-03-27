"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, FileText, Globe } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuggestNextActionDialog({
  nextAction,
  isOpen,
  setOpen,
}: {
  nextAction?: "cv" | "website";
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

  const suggestCV = nextAction === "cv";

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Nice! Wanna get a {suggestCV ? "CV" : "website"} too?
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Now that you have a{" "}
            {suggestCV ? "website" : "CV (check your downloads folder)"}, why
            not also generate {suggestCV ? "" : "& deploy"} an outstanding{" "}
            {suggestCV ? "professional CV" : "personal website"} in seconds?
          </DialogDescription>
        </DialogHeader>

        <Link
          href={`/generate/${nextAction}/template${searchParamsString}`}
          className="group flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-background p-6 text-center shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow"
        >
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
          <h3 className="mb-1 font-medium  ">{suggestCV ? "CV" : "Website"}</h3>
          <p className="mb-3 text-sm text-slate-500">
            {suggestCV
              ? "Create a professional resume"
              : "Build your personal website"}
          </p>
          <span
            className={`inline-flex items-center text-sm font-medium text-${
              suggestCV ? "blue" : "purple"
            }-600`}
          >
            Get started{" "}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
