import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarRail
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingWebsiteEditor() {
  return (
    <SidebarProvider className="flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar skeleton */}
        <Sidebar className="top-16 !h-[calc(100svh-)]">
          <SidebarContent>
            <div className="space-y-6 p-4">
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
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        {/* Main content skeleton */}
        <SidebarInset>
          <div className="absolute left-4">
            <Skeleton className="fixed top-20 h-10 w-10 rounded-md" />
          </div>

          {/* Website preview skeleton */}
          <div className="flex h-full flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-8">
              {/* Hero section */}
              <div className="space-y-4">
                <Skeleton className="mx-auto h-12 w-3/4" />
                <Skeleton className="mx-auto h-6 w-1/2" />
                <Skeleton className="mx-auto h-10 w-48" />
              </div>

              {/* About section */}
              <div className="space-y-4">
                <Skeleton className="h-8 w-32" />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <Skeleton className="h-48 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-5/6" />
                  </div>
                </div>
              </div>

              {/* Experience section */}
              <div className="space-y-4">
                <Skeleton className="h-8 w-40" />
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-2/5" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </div>

              {/* Skills section */}
              <div className="space-y-4">
                <Skeleton className="h-8 w-24" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-16 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
