import { getTemplateWebsiteById } from "@/components/templates/website/website-template-gate";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useProfileStore } from "@/hooks/use-profile";
import { TemplateId } from "@/lib/types";
import { SidebarIcon } from "lucide-react";

export default function WebsiteEditorPreview({
  templateId,
}: {
  templateId: TemplateId;
}) {
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
      {getTemplateWebsiteById(templateId, profileData)}
    </>
  );
}
