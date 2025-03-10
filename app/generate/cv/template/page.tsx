import { ProfileData, PromiseSearchParams } from "@/lib/types";
import { redirect } from "next/navigation";
import CVTemplateCard from "./components/cv-template-card";
import { cvTemplates } from "@/config/templates";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CVTemplatePage({
  searchParams,
}: {
  searchParams: PromiseSearchParams;
}) {
  const params = await searchParams;
  const { username } = params;

  if (!username) {
    redirect("/");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${username}`
  );

  if (!response.ok) {
    redirect("/");
  }

  const profileData: ProfileData = await response.json();

  return (
    <div className="min-h-screen max-w-[1400px] mx-auto px-4 py-12">
      <Button
        variant="link"
        size="lg"
        className="group text-muted-foreground absolute"
        asChild
      >
        <Link href={`/generate/choose?username=${username}`}>
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Link>
      </Button>
      <div className="mb-10 mt-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Choose Your CV Template, {profileData.firstName}
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Select a template that best represents your professional style and
          career goals. You can customize it further after selection.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cvTemplates.map((template) => (
          <CVTemplateCard
            key={template.id}
            template={template}
            username={username as string}
          />
        ))}
      </div>
    </div>
  );
}
