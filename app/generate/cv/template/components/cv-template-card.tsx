import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CVPreviewPopup from "@/app/generate/cv/template/components/cv-preview-popup";
import { CVTemplate } from "@/lib/types";

export default function CVTemplateCard({
  template,
  username,
}: {
  template: CVTemplate;
  username: string;
}) {
  return (
    <Card className="group/card flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardContent className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
        <Image
          src={`/cvs/images/${template.id}.jpg`}
          alt={`${template.name} CV Template`}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover/card:opacity-100"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/card:opacity-100">
          <CVPreviewPopup
            templateId={template.id}
            templateName={template.name}
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-1 flex-col p-4 items-stretch border-t">
        <h3 className="mb-1 font-medium text-slate-900">{template.name}</h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground">
          {template.description}
        </p>

        <Button asChild className="group/button">
          <Link
            href={`/generate/cv/editor/?username=${username}&templateId=${template.id}`}
          >
            Use this template
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
