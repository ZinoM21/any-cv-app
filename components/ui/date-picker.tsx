import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Slot, SlotProps } from "@radix-ui/react-slot";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { type OnSelectHandler } from "react-day-picker";

export function DatePicker({
  closeOnSelect = true,
  disabled,
  fromDate,
  toDate,
  onSelect,
  SlotComponent = Slot,
  selected,
  triggerClassName
}: {
  closeOnSelect?: boolean;
  disabled?: boolean;
  fromDate?: Date;
  toDate?: Date;
  onSelect: OnSelectHandler<Date>;
  SlotComponent?: React.ForwardRefExoticComponent<
    SlotProps & React.RefAttributes<HTMLElement>
  >;
  selected?: Date;
  triggerClassName?: string;
}) {
  // const [date, setDate] = useState<Date | undefined>(
  //   typeof selected === "string" ? new Date(selected) : selected
  // );
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <SlotComponent>
          <Button
            variant="outline"
            className={cn(
              "pl-3 text-left font-normal",
              !selected && "text-muted-foreground",
              triggerClassName
            )}
          >
            {selected ? format(selected, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </SlotComponent>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(...params) => {
            onSelect(...params);
            if (closeOnSelect) {
              setTimeout(() => setOpen(false), 100);
            }
          }}
          disabled={disabled}
          startMonth={fromDate}
          endMonth={toDate}
          required
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
