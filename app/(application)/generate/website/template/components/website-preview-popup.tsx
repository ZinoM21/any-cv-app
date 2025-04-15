import { getTemplateWebsiteById } from "@/components/templates/website/website-template-gate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { demoData } from "@/lib/demo-data";
import { TemplateId } from "@/lib/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Eye, X } from "lucide-react";

export default function WebsitePreviewPopup({
  templateId,
  templateName,
}: {
  templateId: TemplateId;
  templateName: string;
}) {
  return (
    <Dialog key={templateId}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent
        className="h-[90vh] w-[90vw] max-w-[1400px] p-0"
        showClose={false}
      >
        <DialogHeader className="absolute flex-row space-y-0 w-full justify-between items-center -top-10 text-foreground">
          <DialogTitle>{templateName} Template - Preview</DialogTitle>
          <DialogClose asChild>
            <Button type="button" variant="outline" size="sm" className="p-2">
              <X className="size-4 text-foreground" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-4">
          {getTemplateWebsiteById(templateId, demoData)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
