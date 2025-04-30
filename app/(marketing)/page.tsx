import Script from "next/script";
import { RotatingText } from "./components/rotating-text";
import { SubmitLinkForm } from "./components/submit-link-form";

export default function Home() {
  return (
    <div className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js"></Script>
      <section className="flex w-full justify-center py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="max-w-5xl text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl/none">
                Create Your <RotatingText />
                <span className="whitespace-nowrap"> in Seconds</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Transform your LinkedIn profile into a stunning online
                appearance + CV in just one minute. Stand out from the crowd and
                land your dream job.
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <SubmitLinkForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
