import { RotatingText } from "@/components/rotating-text";
import { SubmitLinkForm } from "@/components/forms/submit-link-form";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-primary/20 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none max-w-5xl">
                Create Your <RotatingText />
                <span className="whitespace-nowrap"> in Seconds</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Transform your LinkedIn profile into a stunning online appearance + CV in just one minute. Stand out from the crowd and land your dream job.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <SubmitLinkForm />
            </div>
          </div>
        </div>
      </section>
      <Toaster position="top-center" richColors closeButton />
    </main>
  );
}
