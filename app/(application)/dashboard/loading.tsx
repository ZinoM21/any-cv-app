import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:mb-6">
        My Profiles
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card className="h-full" key={index}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Skeleton className="size-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="mt-3 h-4 w-1/3" />
              <div className="mt-3 flex flex-wrap gap-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className={`h-6 w-${[24, 28, 32, 36][Math.floor(Math.random() * 4)]} rounded-full`}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
