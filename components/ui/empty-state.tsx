import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import * as React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icons?: LucideIcon[];
  action?: React.ReactElement;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icons = [],
  action,
  className
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border bg-background text-center hover:border-border/80",
        "w-full max-w-[620px] rounded-xl border-2 border-dashed p-14",
        "group transition duration-500 hover:bg-muted/50 hover:duration-200",
        className
      )}
    >
      <div className="isolate flex justify-center">
        {icons.length === 3 ? (
          <>
            <div className="relative left-2.5 top-1.5 grid size-12 -rotate-6 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-x-5 group-hover:-translate-y-0.5 group-hover:-rotate-12 group-hover:duration-200">
              {React.createElement(icons[0], {
                className: "w-6 h-6 text-muted-foreground"
              })}
            </div>
            <div className="relative z-10 grid size-12 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-y-0.5 group-hover:duration-200">
              {React.createElement(icons[1], {
                className: "w-6 h-6 text-muted-foreground"
              })}
            </div>
            <div className="relative right-2.5 top-1.5 grid size-12 rotate-6 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-5 group-hover:rotate-12 group-hover:duration-200">
              {React.createElement(icons[2], {
                className: "w-6 h-6 text-muted-foreground"
              })}
            </div>
          </>
        ) : (
          <div className="grid size-12 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-y-0.5 group-hover:duration-200">
            {icons[0] &&
              React.createElement(icons[0], {
                className: "w-6 h-6 text-muted-foreground"
              })}
          </div>
        )}
      </div>
      <h2 className="mt-6 font-medium text-foreground">{title}</h2>
      <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
        {description}
      </p>
      {action && action}
    </div>
  );
}
