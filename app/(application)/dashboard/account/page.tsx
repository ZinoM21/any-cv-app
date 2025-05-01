import { DeleteAccountCard } from "@/app/(application)/dashboard/delete-account-card";
import { auth, signOut } from "@/auth";
import { UpdateUserForm } from "@/app/(application)/dashboard/update-user-form";
import { ResetPasswordForm } from "@/components/auth";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getServerApi } from "@/lib/api";
import { getUser } from "@/lib/api/api";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Account Settings - BuildAnyCV",
  description: "Manage your BuildAnyCV account settings"
};

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  if (session?.error === "RefreshAccessTokenError") {
    signOut({ redirectTo: "/signin" });
  }
  const api = await getServerApi();
  const user = await getUser(api);

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex flex-row items-center justify-between sm:mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Account Settings
        </h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {user?.firstName} {user?.lastName}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              {user?.email}
              <Badge variant={user?.email_verified ? "default" : "secondary"}>
                {user?.email_verified ? "Verified" : "Not verified"}
              </Badge>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>General Info</CardTitle>
            <CardDescription>Change your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <UpdateUserForm user={user} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <ResetPasswordForm />
          </CardContent>
        </Card>
        <DeleteAccountCard />
      </div>
    </div>
  );
}
