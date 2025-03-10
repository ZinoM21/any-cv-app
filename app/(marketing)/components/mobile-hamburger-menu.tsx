"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";

import { Menu, X } from "lucide-react";
import { NavItem } from "@/lib/types";

function MobileHamburgerMenu({
  navigation,
}: Readonly<{ navigation: NavItem[] }>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-4 mr-6">
        <div className="space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button variant="outline" asChild className="w-full mt-4">
            <Link href="/signin" onClick={() => setOpen(false)}>
              Sign in
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default MobileHamburgerMenu;
