import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export const PDFLoadingSkeleton = ({
  className,
}: {
  className?: ClassValue;
}) => {
  return (
    <div className={cn("overflow-hidden w-[590px]", className)}>
      {/* A4 Paper with content */}
      <div className="mx-auto bg-white shadow-md rounded-sm p-8 flex flex-col gap-4 border border-gray-200 mt-1">
        {/* Header section */}
        <div className="flex items-start gap-4 mb-6">
          <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Section title */}
        <Skeleton className="h-5 w-1/3 mb-2" />

        {/* Experience items */}
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>

        {/* Education section */}
        <Skeleton className="h-5 w-1/4 mb-2" />
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="h-3 w-3/5" />
            <Skeleton className="h-3 w-full" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/5" />
            </div>
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>

        {/* Skills section */}
        <Skeleton className="h-5 w-1/5 mb-2" />
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Additional content */}
        <Skeleton className="h-5 w-1/4 mb-2" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    </div>
  );
};
