import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingWebsiteTemplate() {
  return (
    <div className="mx-auto flex h-full max-w-[1400px] flex-col gap-10 px-4 pt-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <Skeleton className="mx-auto mb-2 h-10 w-3/4 max-w-md" />
        <Skeleton className="mx-auto h-6 w-2/3 max-w-xl" />
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="group flex flex-col rounded-lg border border-muted bg-background shadow-sm transition-all hover:border-input hover:bg-muted hover:shadow"
          >
            {/* Website Preview Area */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg border-b bg-white p-6">
              {i % 2 === 0 ? (
                // Modern centered layout
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Skeleton className="mb-4 h-5 w-36" />
                  <Skeleton className="mb-8 h-32 w-32 rounded-full" />
                  <Skeleton className="mb-2 h-4 w-48" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-8" />
                    <Skeleton className="h-3 w-8" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </div>
              ) : (
                // Classic layout
                <div className="flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-24" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-11/12" />
                  </div>
                </div>
              )}
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
