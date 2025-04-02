"use client";

import { ReactNode, useCallback, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * AddNewPopover is a component that renders a popover with a trigger and a form.
 * It is used to add new items to a list.
 * By default, renders a button with dashed border. Can be overridden by passing a trigger prop.
 * Children receive a callable to close the popover from the outside.
 *
 * @param {string | never} title - A string title used in the default trigger button.
 * @param {ReactNode | never} trigger - A ReactNode trigger. Note: title is not shown in trigger.
 */
export default function AddNewPopover({
  title,
  trigger,
  children,
}: {
  title?: string;
  trigger?: ReactNode;
  children: (onClose: () => void) => ReactNode;
}) {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const toggleOpen = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  const Trigger = trigger || (
    <Button
      type="button"
      variant="outline"
      className="flex-1 rounded-lg p-7 mx-0.5 text-center border-grid"
    >
      <Plus className="size-4" />
      {title}
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer open={openMobile} onOpenChange={setOpenMobile}>
        <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
        <DrawerContent className="sm:max-w-[425px]">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 border-t overflow-y-auto max-h-[calc(100vh-10rem)]">
            {children(toggleOpen)}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{Trigger}</PopoverTrigger>
      <PopoverContent className="w-[500px] p-4 space-y-4" side="right">
        <h4 className="font-semibold leading-none tracking-tight">{title}</h4>
        {children(toggleOpen)}
      </PopoverContent>
    </Popover>
  );
}
