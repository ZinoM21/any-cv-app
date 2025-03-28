"use client";

import { ReactNode, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function AddNewPopover({
  title,
  children,
}: {
  title: string;
  children: (onClose: () => void) => ReactNode;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex-1 rounded-lg p-7 mx-0.5 text-center border-grid"
        >
          <Plus className="size-4" />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-4" side="right">
        {children(() => setPopoverOpen(false))}
      </PopoverContent>
    </Popover>
  );
}
