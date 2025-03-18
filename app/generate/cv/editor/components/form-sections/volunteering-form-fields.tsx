import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { useFormContext } from "react-hook-form";

export default function VolunteeringFormFields({
  fieldNamePrefix,
}: {
  fieldNamePrefix?: string;
}) {
  const { control, getValues } = useFormContext();
  const getFieldName = (fieldName: string) =>
    fieldNamePrefix ? `${fieldNamePrefix}.${fieldName}` : fieldName;

  const organizationName = getValues(getFieldName("company"));

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name={getFieldName("role")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Volunteer Coordinator" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={getFieldName("organization")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Red Cross" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={getFieldName("organizationLogoUrl")}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={getFieldName("organizationLogoUrl")}>
              Organization Logo (Optional)
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                {field.value ? (
                  <div className="h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                    <Image
                      src={field.value || "/placeholder.svg"}
                      alt={organizationName + "Logo" || ""}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <span className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                    Logo
                  </span>
                )}

                <Button
                  type="button"
                  variant="outline"
                  // onClick={() => handleOrganizationLogoUpload(expIndex)}
                >
                  Change Logo
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name={getFieldName("organizationProfileUrl")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization URL (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://organization.org" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={getFieldName("cause")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cause</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Education, Environment, etc." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name={getFieldName("startDate")}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <DatePicker
                SlotComponent={FormControl}
                disabled={field.disabled}
                onSelect={field.onChange}
                selected={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={getFieldName("endDate")}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <DatePicker
                SlotComponent={FormControl}
                disabled={field.disabled}
                onSelect={field.onChange}
                selected={field.value}
              />
              <FormDescription>
                Leave empty for current volunteering
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={getFieldName("description")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description (Optional)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
