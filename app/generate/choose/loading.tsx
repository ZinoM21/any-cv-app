import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Link } from "lucide-react";

export default function LoadingGenerate() {
  return (
    <div className="h-screen max-w-[1400px] mx-auto px-4 py-12">
      <Button
        variant="link"
        size="lg"
        className="group text-muted-foreground absolute"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>
      </Button>
      <div className="flex h-full flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              <Skeleton className="w-24 h-6 mt-0.5" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-36 h-8 mt-2" />
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="group flex flex-col items-center justify-center rounded-lg border border-muted bg-background p-6 text-center shadow-sm transition-all hover:border-input hover:bg-muted hover:shadow">
                <Skeleton className="mb-3 rounded-full size-12" />
                <Skeleton className="mb-3 h-5 w-7" />
                <Skeleton className="mb-1 h-4 w-24" />
                <Skeleton className="mb-3 h-4 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>

              <div className="group flex flex-col items-center justify-center rounded-lg border border-muted bg-background p-6 text-center shadow-sm transition-all hover:border-input hover:bg-muted hover:shadow">
                <Skeleton className="mb-3 rounded-full size-12" />
                <Skeleton className="mb-3 h-5 w-16" />
                <Skeleton className="mb-1 h-4 w-24" />
                <Skeleton className="mb-3 h-4 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <Skeleton className="w-72 h-4 mt-2" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
