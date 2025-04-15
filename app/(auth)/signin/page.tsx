import { auth } from "@/auth";
import BuiltAnyCVLogo from "@/components/logo";
import { Card, CardContent } from "@/components/ui/card";
import { FileUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignInForm } from "../../../components/auth/login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="flex flex-col gap-6 w-full max-w-sm md:max-w-3xl z-10">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <FileUser className="size-4" />
          </div>
          <BuiltAnyCVLogo />
        </div>
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="flex flex-col gap-6 p-6 md:p-8">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your builtanycv account
                  </p>
                </div>

                <SignInForm />
              </div>
              <div className="hidden md:flex md:items-center md:bg-muted md:px-20">
                <Image
                  src="/svgs/undraw_update_resume.svg"
                  alt="Login Image"
                  className="dark:brightness-[0.2] dark:grayscale"
                  width={300}
                  height={235}
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
