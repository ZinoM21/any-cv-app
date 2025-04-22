import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const ContactInfoFormFields = () => {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="your.email@example.com"
                type="email"
                {...field}
              />
            </FormControl>
            <FormDescription>Your primary contact email</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="+1 (555) 123-4567" {...field} />
            </FormControl>
            <FormDescription>
              Include your country code for international calls
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website</FormLabel>
            <FormControl>
              <Input placeholder="https://www.example.com" {...field} />
            </FormControl>
            <FormDescription>
              Your current personal or professional website
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="City, State, Country" {...field} />
            </FormControl>
            <FormDescription>
              Your primary location (e.g., &quot;Berlin, Germany&quot;)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
