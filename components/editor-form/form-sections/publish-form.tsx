import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TemplateId } from "@/lib/types";
import { getTemplateIdFromParamsOrRedirect } from "@/lib/utils";
import { Moon, Ship, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";

const publishFormSchema = z.object({
  appearance: z.enum(["light", "dark"]),
  templateId: z.enum([
    TemplateId.Minimal,
    TemplateId.Creative,
    TemplateId.Classic,
    TemplateId.Modern
  ]),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens. It cannot start or end with a hyphen."
    )
    .transform((val) => val.toLowerCase())
});

export type PublishFormValues = z.infer<typeof publishFormSchema>;

export default function PublishForm({
  onSubmit
}: {
  onSubmit: (data: PublishFormValues) => Promise<void>;
}) {
  const { resolvedTheme } = useTheme();

  const searchParams = useSearchParams();
  const templateId = getTemplateIdFromParamsOrRedirect(
    searchParams.get("templateId")
  );

  const formMethods = useForm<PublishFormValues>({
    resolver: zodResolver(publishFormSchema),
    defaultValues: {
      appearance: resolvedTheme as "light" | "dark",
      templateId: templateId,
      slug: ""
    },
    mode: "all"
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid }
  } = formMethods;

  const onSubmitPublish = (data: PublishFormValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitPublish)} className="grid gap-4">
        <div className="space-y-1">
          <FormField
            control={formMethods.control}
            name="appearance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appearance</FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={resolvedTheme}
                    className="grid max-w-md grid-cols-2 gap-8 pt-2"
                  >
                    <div>
                      <Label className="[&:has([data-state=checked])>div]:border-primary">
                        <RadioGroupItem value="light" className="sr-only" />
                        <div className="cursor-pointer items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Light
                        </span>
                      </Label>
                    </div>
                    <div>
                      <Label className="[&:has([data-state=checked])>div]:border-primary">
                        <RadioGroupItem value="dark" className="sr-only" />
                        <div className="cursor-pointer items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                          <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Dark
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Your current theme is set to{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                    {resolvedTheme}
                  </code>
                  . Checkout how it looks by pressing the{" "}
                  {resolvedTheme === "light" ? (
                    <Sun className="mb-0.5 inline-block size-3" />
                  ) : (
                    <Moon className="mb-0.5 inline-block size-3" />
                  )}{" "}
                  in the top right corner.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={formMethods.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} placeholder="my-slug" />
              </FormControl>

              {formMethods.formState.errors.slug ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  https://built-any-cv.com/
                  {field.value.length > 0 ? field.value : "my-slug"} will be
                  your personal website link
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={!isValid}>
            Ship
            <Ship />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
