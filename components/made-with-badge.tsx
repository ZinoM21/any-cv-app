import { FileUser } from "lucide-react";
import { Badge } from "./ui/badge";

export default function MadeWithBadge() {
  return (
    <div className="absolute left-4">
      <Badge
        className="fixed bottom-4 bg-background py-2 shadow-2xl"
        variant="outline"
      >
        <div className="flex h-6 w-6 items-center justify-center mr-2 rounded-md bg-primary text-primary-foreground">
          <FileUser className="size-4" />
        </div>
        Made with BuildAnyCV
      </Badge>
    </div>
  );
}
