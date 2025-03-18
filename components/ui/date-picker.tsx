import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Slot, SlotProps } from "@radix-ui/react-slot";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

export function DatePicker({
  closeOnSelect = true,
  disabled,
  fromDate,
  toDate,
  onSelect,
  SlotComponent = Slot,
  selected,
  triggerClassName,
}: {
  closeOnSelect?: boolean;
  disabled?: boolean;
  fromDate?: Date;
  toDate?: Date;
  onSelect: SelectSingleEventHandler;
  SlotComponent?: React.ForwardRefExoticComponent<
    SlotProps & React.RefAttributes<HTMLElement>
  >;
  selected?: Date;
  triggerClassName?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(
    typeof selected === "string" ? new Date(selected) : selected
  );
  const [open, setOpen] = useState(false);

  const minDate = typeof fromDate === "string" ? new Date(fromDate) : fromDate;
  const maxDate = typeof toDate === "string" ? new Date(toDate) : toDate;

  const handleSelect: SelectSingleEventHandler = (...params) => {
    const [date, ...rest] = params;
    setDate(date);
    onSelect(date, ...rest);

    if (closeOnSelect) {
      setTimeout(() => setOpen(false), 100);
    }
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <SlotComponent>
          <Button
            variant="outline"
            className={cn(
              "pl-3 text-left font-normal",
              !date && "text-muted-foreground",
              triggerClassName
            )}
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </SlotComponent>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          initialFocus
          fromDate={minDate}
          toDate={maxDate}
        />
      </PopoverContent>
    </Popover>
  );
}
