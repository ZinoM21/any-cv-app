import { useFormContext } from "react-hook-form";

import { DatePicker } from "@/components/ui/date-picker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageInput } from "./image-input";
import { SignedImage } from "./signed-image";

export default function ProjectFormFields({
  fieldNamePrefix
}: {
  fieldNamePrefix?: string;
}) {
  const { control, getValues } = useFormContext();
  const getFieldName = (fieldName: string) =>
    fieldNamePrefix ? `${fieldNamePrefix}.${fieldName}` : fieldName;

  const thumbnail = getValues(getFieldName("thumbnail"));

  return (
    <>
      <FormField
        control={control}
        name={getFieldName("title")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title or Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Portfolio Website" />
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
                Leave empty for ongoing projects
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={getFieldName("url")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link (Optional)</FormLabel>
            <FormControl>
              <Input
                type="url"
                placeholder="https://myproject.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={getFieldName("associatedWith")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Associated With (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="University or Company Name" {...field} />
            </FormControl>
            <FormDescription>
              If this project was part of a course or work assignment
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={getFieldName("description")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description (Optional)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe the project, its purpose, your role, and key achievements..."
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={getFieldName("thumbnail")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Thumbnail (Optional)</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <SignedImage
                  src={field?.value}
                  alt={thumbnail}
                  width={80}
                  height={80}
                  fallback="Thumbnail"
                  className="size-fit w-1/2 aspect-video"
                />
                <ImageInput
                  field={field}
                  label="Change thumbnail"
                  fileName="thumbnail"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
