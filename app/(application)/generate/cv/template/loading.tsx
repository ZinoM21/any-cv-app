import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCVTemplate() {
  return (
    <div className="mx-auto flex h-full max-w-[1400px] flex-col gap-10 px-4 pt-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <Skeleton className="mx-auto mb-2 h-10 w-3/4 max-w-md" />
        <Skeleton className="mx-auto h-6 w-2/3 max-w-xl" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="group flex flex-col rounded-lg border border-muted bg-background shadow-sm transition-all hover:border-input hover:bg-muted hover:shadow"
          >
            {/* CV Preview Area */}
            <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-t-lg border-b bg-white p-6">
              {/* Header */}
              <div className="mb-4 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/5" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-11/12" />
                  <Skeleton className="h-3 w-4/5" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex flex-col gap-2 p-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
