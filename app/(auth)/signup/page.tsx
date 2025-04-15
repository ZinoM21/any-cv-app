import BuiltAnyCVLogo from "@/components/logo";
import { SignUpForm } from "../../../components/auth/signup-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 px-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-foreground lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <BuiltAnyCVLogo className="text-white" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 text-white">
            <p className="text-lg">
              &ldquo;This platform has revolutionized how I create and manage my
              CV. The templates are beautiful and the process is
              seamless.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <BuiltAnyCVLogo className="text-foreground lg:hidden" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account with BuiltAnyCV
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
