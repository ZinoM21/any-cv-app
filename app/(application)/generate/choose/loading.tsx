import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingGenerate() {
  return (
    <div className="mx-auto h-screen max-w-[1400px] px-4 py-12">
      <div className="flex h-full flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              <Skeleton className="mt-0.5 h-6 w-24" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="mt-2 h-8 w-36" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="group flex flex-col items-center justify-center rounded-lg border border-muted bg-background p-6 text-center shadow-sm transition-all hover:border-input hover:bg-muted hover:shadow">
                <Skeleton className="mb-3 size-12 rounded-full" />
                <Skeleton className="mb-3 h-5 w-7" />
                <Skeleton className="mb-1 h-4 w-24" />
                <Skeleton className="mb-3 h-4 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>

              <div className="group flex flex-col items-center justify-center rounded-lg border border-muted bg-background p-6 text-center shadow-sm transition-all hover:border-input hover:bg-muted hover:shadow">
                <Skeleton className="mb-3 size-12 rounded-full" />
                <Skeleton className="mb-3 h-5 w-16" />
                <Skeleton className="mb-1 h-4 w-24" />
                <Skeleton className="mb-3 h-4 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <Skeleton className="mt-2 h-4 w-72" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
