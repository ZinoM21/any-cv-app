import { Skeleton } from "@/components/ui/skeleton";
import { PDFLoadingSkeleton } from "./components/preview/pdf-loading";

export default function LoadingEditor() {
  return (
    <div className="flex h-full flex-col">
      {/* Mobile view tabs */}
      <div className="flex w-full border-b bg-background lg:hidden">
        <div className="flex-1 border-b-2 border-blue-600 py-2 text-center font-medium text-blue-600 sm:py-4">
          Edit Information
        </div>
        <div className="flex-1 border-b-2 border-transparent py-2 text-center font-medium text-muted-foreground sm:py-4">
          Preview CV
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Form section skeleton */}
        <div className="hidden w-full flex-col lg:flex lg:w-[40%] lg:max-w-xl">
          <div className="flex-1 overflow-y-auto bg-background p-4">
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Experience Section */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview section skeleton */}
        <div className="flex w-full flex-1 flex-col">
          <div className="border-grid z-10 flex items-center justify-between border-b border-l bg-background p-3 sm:p-4">
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
          <div className="flex flex-1 justify-center overflow-y-auto bg-muted">
            <div className="pt-5">
              <PDFLoadingSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
