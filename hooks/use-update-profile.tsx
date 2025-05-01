"use client";

import type { UpdateUserFormValues } from "@/lib/schemas/user-schemas";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateUser } from "@/lib/api/api";

import { ApiErrorType } from "@/lib/errors";

import useApi from "./use-api";

export const useUpdateUser = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: UpdateUserFormValues) => {
      return await updateUser(api, values);
    },
    onSuccess: () => {
      toast.success("Account updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      if (error.message === ApiErrorType.ResourceNotFound) {
        toast.error("Update failed", {
          description: "User not found. Please try signing in again."
        });
      }
      if (error.message === ApiErrorType.BadRequest) {
        toast.error("Update failed", {
          description:
            "Invalid input. Please check your information and try again."
        });
      }
    }
  });
};
