import Script from "next/script";
import { RotatingText } from "./components/rotating-text";
import { SubmitLinkForm } from "./components/submit-link-form";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js"></Script>

      {/* Hero Section */}
      <section className="flex min-h-screen w-full items-center justify-center py-16 md:py-28 lg:py-36">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
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

      {/* How It Works Section */}
      <section className="mt-12 w-full bg-muted/50 py-16 md:py-28">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              How It Works
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              Simple steps to create your professional CV
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-background p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold">Submit your profile</h3>
                <p className="mt-2 text-muted-foreground">
                  Enter your LinkedIn URL and we&apos;ll do the rest
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-background p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold">Customize your CV</h3>
                <p className="mt-2 text-muted-foreground">
                  Choose from multiple designs and personalize it
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-background p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold">Share and download</h3>
                <p className="mt-2 text-muted-foreground">
                  Get your professional CV ready to use
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-12 w-full py-16 md:py-28">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Key Features
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              Everything you need for a professional online presence
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">AI-Powered CV Creation</h3>
                <p className="mt-2 text-muted-foreground">
                  Our AI extracts and formats your professional experience
                  perfectly
                </p>
              </div>
              <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">Beautiful Templates</h3>
                <p className="mt-2 text-muted-foreground">
                  Choose from multiple professional designs
                </p>
              </div>
              <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">Easy Sharing</h3>
                <p className="mt-2 text-muted-foreground">
                  Share your CV with a custom link or download as PDF
                </p>
              </div>
              <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">Mobile Responsive</h3>
                <p className="mt-2 text-muted-foreground">
                  Your CV looks great on any device
                </p>
              </div>
              <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">ATS Friendly</h3>
                <p className="mt-2 text-muted-foreground">
                  Optimized to pass Applicant Tracking Systems
                </p>
              </div>
              <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">Easy Updates</h3>
                <p className="mt-2 text-muted-foreground">
                  Keep your CV current with simple updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-12 w-full bg-muted/50 py-16 md:py-28">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <span className="text-sm font-medium text-primary">
              Testimonials
            </span>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Trusted by leaders
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              from various industries
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="italic text-muted-foreground">
                &quot;This tool helped me land my dream job! The CV was
                professional and stood out from other applicants.&quot;
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10"></div>
                <div className="ml-3">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    Marketing Manager
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="italic text-muted-foreground">
                &quot;The simplicity and professional design of my CV made all
                the difference in my job search.&quot;
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10"></div>
                <div className="ml-3">
                  <p className="font-medium">David Chen</p>
                  <p className="text-sm text-muted-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-background p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="italic text-muted-foreground">
                &quot;I was able to create and share my professional CV in
                minutes. Recruiters loved the design!&quot;
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10"></div>
                <div className="ml-3">
                  <p className="font-medium">Emma Taylor</p>
                  <p className="text-sm text-muted-foreground">
                    Product Designer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-12 w-full py-16 md:py-28">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[700px] text-muted-foreground">
              Get answers to common questions
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Is it really free?</h3>
              <p className="text-muted-foreground">
                Yes, creating your CV is completely free with basic features.
                Premium options are available for advanced needs.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How long does it take?</h3>
              <p className="text-muted-foreground">
                Most users create their professional CV in under 5 minutes.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Can I download my CV?</h3>
              <p className="text-muted-foreground">
                Yes, you can download your CV in PDF format or share it via a
                custom link.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Is my data secure?</h3>
              <p className="text-muted-foreground">
                We take data security seriously. Your information is encrypted
                and never shared without permission.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="mt-12 w-full border-t py-8">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BuiltAnyCV. All rights reserved.
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span>Made with ❤️ in Berlin</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
