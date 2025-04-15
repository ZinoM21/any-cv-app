import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CVTemplate } from "@/lib/types";
import { buildQueryString, getWebsitePreviewImage } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { SearchParams } from "next/dist/server/request/search-params";
import Image from "next/image";
import Link from "next/link";
import WebsitePreviewPopup from "./website-preview-popup";

export default function WebsiteTemplateCard({
  template,
  username,
  params,
}: {
  template: CVTemplate;
  username: string;
  params: SearchParams;
}) {
  return (
    <Card className="group/card flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardContent className="relative aspect-[5/3] w-full overflow-hidden bg-muted">
        <Image
          src={getWebsitePreviewImage(template.id)}
          alt={`${template.name} CV Template Preview`}
          className="object-cover object-center"
          placeholder="blur"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, (max-width: 1024px) 33vw "
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover/card:opacity-100"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/card:opacity-100">
          <WebsitePreviewPopup
            templateId={template.id}
            templateName={template.name}
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-1 flex-col p-4 items-stretch border-t">
        <h3 className="mb-1 font-medium  ">{template.name}</h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground">
          {template.description}
        </p>

        <Button asChild className="group/button">
          <Link
            href={`/generate/website/editor/?${buildQueryString(params, {
              set: { username, templateId: template.id },
            })}`}
          >
            Use this template
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
