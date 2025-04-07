import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSignedUploadUrl, useSignedUrl } from "@/hooks/use-image-url";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { extension } from "mime-types";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { useSession } from "@/hooks/use-session";
import SignInDialog from "@/components/auth/sign-in-dialog";

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
  const { isSignedIn } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useSignedUploadUrl();
  const { refetch } = useSignedUrl(field.value);

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

          // Reset input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }

          refetch();
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

  const UploadButton = (
    <Button
      type="button"
      variant="outline"
      onClick={isSignedIn ? selectFile : undefined}
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
  );

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={uploadFile}
        style={{ display: "none" }}
        accept="image/*"
      />

      {isSignedIn ? (
        UploadButton
      ) : (
        <SignInDialog
          trigger={UploadButton}
          onSuccess={selectFile}
          customTitle="Sign in to upload images"
          customDescription="You need to be signed in to upload or change images."
        />
      )}
    </>
  );
}
