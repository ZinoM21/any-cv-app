"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useState } from "react";
import DeleteAccountDialog from "./delete-account-dialog";

export function DeleteAccountCard() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Delete Account</CardTitle>
        <CardDescription>
          Permanently delete your account and all associated data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
        <DeleteAccountDialog open={open} setIsOpen={setOpen} />
      </CardContent>
    </Card>
  );
}
