import { ResetPasswordForm } from "@/components/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const metadata = {
  title: "Account Settings - BuildAnyCV",
  description: "Manage your BuildAnyCV account settings"
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex flex-row items-center justify-between sm:mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Account Settings
        </h1>
      </div>

      <div className="grid gap-6">
        {/* <Card>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
            <CardDescription>Change your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <ResetPasswordForm />
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Change your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
