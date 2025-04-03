import { websiteTemplateComponentMap } from "@/components/templates/website/website-template-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useProfileStore } from "@/hooks/use-profile";
import { TemplateId } from "@/lib/types";
import { FileUser, SidebarIcon } from "lucide-react";

export default function WebsiteEditorPreview({
  templateId,
}: {
  templateId: TemplateId;
}) {
  const TemplateWebsiteComponent =
    websiteTemplateComponentMap[templateId] ||
    websiteTemplateComponentMap[TemplateId.Classic];

  const { toggleSidebar } = useSidebar();

  const profileData = useProfileStore((state) => state.profile);

  if (!profileData) return null;

  return (
    <>
      <div className="absolute left-4">
        <Button
          className="fixed top-20 p-2 "
          variant="outline"
          onClick={toggleSidebar}
        >
          <SidebarIcon className="size-4" />
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>B
          </kbd>
        </Button>
      </div>
      <TemplateWebsiteComponent profileData={profileData} />
      <div className="absolute left-4">
        <Badge
          className="fixed bottom-4 bg-background py-2 shadow-2xl"
          variant="outline"
        >
          <div className="flex h-6 w-6 items-center justify-center mr-2 rounded-md bg-primary text-primary-foreground">
            <FileUser className="size-4" />
          </div>
          Made with BuiltAnyCV
        </Badge>
      </div>
    </>
  );
}
