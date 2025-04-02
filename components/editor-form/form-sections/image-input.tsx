import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSignedUploadUrl } from "@/hooks/use-image-url";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { extension } from "mime-types";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

interface ImageInputProps {
  field: ControllerRenderProps<FieldValues>;
  label?: string;
  fileName?: string;
}

/**
 * @param field - Field of the form
 * @param label - Label of the button
 * @param fileName - File name of the image
 */
export function ImageInput({
  field,
  label = "Change Logo",
  fileName,
}: ImageInputProps) {
  const { setValue } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useSignedUploadUrl();

  const selectFile = () => {
    fileInputRef.current?.click();
  };

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const _file = event.target.files?.[0];
    if (!_file) return;

    const [_fileName, _fileExt] = _file.name.split(".");
    const ext = extension(_file.type) || _fileExt;
    const name = fileName || _fileName;
    const finalFileName = `${name}.${ext}`;

    const file = new File([_file], finalFileName, {
      type: _file.type,
    });

    mutate(
      { file },
      {
        onSuccess: (imagePath) => {
          setValue(field.name, imagePath, {
            shouldValidate: true,
            shouldDirty: true,
          });
          toast.success("Image uploaded successfully");

          // Reset the input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        onError: (error) => {
          console.error("Error uploading image:", error);
          if (error.message.includes("5MB")) {
            toast.error("Failed to upload image: " + error.message);
          } else {
            toast.error("Failed to upload image. Please try again.");
          }

          // Reset the input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
      }
    );
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={uploadFile}
        style={{ display: "none" }}
        accept="image/*"
      />
      <Button
        type="button"
        variant="outline"
        onClick={selectFile}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          label
        )}
      </Button>
    </>
  );
}
