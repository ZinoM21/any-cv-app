import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function LoadingGenerate() {
  return (
    <div className="mt-[-73px] flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/20 to-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">
            <Skeleton className="w-24 h-6 mt-0.5" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-36 h-8 mt-2" />
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="group flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow">
              <Skeleton className="mb-3 rounded-full size-12" />
              <Skeleton className="mb-3 h-5 w-7" />
              <Skeleton className="mb-1 h-4 w-24" />
              <Skeleton className="mb-3 h-4 w-12" />
              <Skeleton className="h-5 w-20" />
            </div>

            <div className="group flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow">
              <Skeleton className="mb-3 rounded-full size-12" />
              <Skeleton className="mb-3 h-5 w-16" />
              <Skeleton className="mb-1 h-4 w-24" />
              <Skeleton className="mb-3 h-4 w-12" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
