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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export default function PositionFormFields({
  fieldNamePrefix,
}: {
  fieldNamePrefix?: string;
}) {
  const getFieldName = (fieldName: string) =>
    fieldNamePrefix ? `${fieldNamePrefix}.${fieldName}` : fieldName;

  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name={getFieldName("title")}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={getFieldName("title")}>Job Title</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Senior Developer"
                className="bg-background"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
                Leave empty for current position
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* <div className="space-y-2">
        <FormLabel>Duration</FormLabel>
        <Input
          value={positionField?.duration || calculateDuration()}
          disabled
          className="bg-slate-50 text-slate-500"
        />
        <p className="text-xs text-slate-500">
          Automatically calculated based on dates
        </p>
      </div> */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name={getFieldName("location")}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={getFieldName("location")}>
                Location (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="New York, NY"
                  className="bg-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={getFieldName("workSetting")}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={getFieldName("workSetting")}>
                Work Setting (Optional)
              </FormLabel>
              <FormControl>
                <Select
                  {...field}
                  defaultValue={field.value || "not-specified"}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Click to select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-specified">Not specified</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
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
            <FormLabel htmlFor={getFieldName("description")}>
              Description
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={4}
                placeholder="Describe your responsibilities and achievements..."
                className="bg-background"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
