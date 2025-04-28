import SignUpDialog from "@/components/auth/sign-up-dialog";
import { Button } from "@/components/ui/button";
import { useSignedUploadUrl, useSignedUrl } from "@/hooks/use-image-url";
import { useProfileStore } from "@/hooks/use-profile";
import { useSession } from "@/hooks/use-session";
import { Loader2 } from "lucide-react";
import { extension } from "mime-types";
import { useRef } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext
} from "react-hook-form";
import { toast } from "sonner";

interface ImageInputProps {
  field: ControllerRenderProps<FieldValues>;
  label?: string;
  fileName?: string;
  big?: boolean;
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
  big = false
}: ImageInputProps) {
  const { setValue } = useFormContext();
  const { isSignedIn, data: session } = useSession();

  const profileData = useProfileStore((state) => state.profile);

  const userId = session?.user?.id;
  const username = profileData?.username;
  const filePathPrefix = `${userId}/${username}`;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: upload, isPending } = useSignedUploadUrl();
  const { refetch: refetchSignedImage } = useSignedUrl(field.value);

  const selectFile = async () => {
    fileInputRef.current?.click();
  };

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const _file = event.target.files?.[0];
    if (!_file) return;

    const [_fileName, _fileExt] = _file.name.split(".");
    const ext = extension(_file.type) || _fileExt;
    const name = fileName || _fileName;
    const finalFileName = `${filePathPrefix}/${name}.${ext}`;

    const file = new File([_file], finalFileName, {
      type: _file.type
    });

    await upload(
      { file },
      {
        onSuccess: async (imagePath) => {
          setValue(field.name, imagePath, {
            shouldValidate: true,
            shouldDirty: true
          });

          toast.success("Image uploaded successfully");

          // Reset input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }

          await refetchSignedImage?.();
        },
        onError: (error) => {
          if (error.message.includes("MB")) {
            toast.error("Failed to upload image: " + error.message);
          } else {
            toast.error("Failed to upload image. Please try again.");
          }

          // Reset the input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      }
    );
  };

  const UploadButton = !big ? (
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
  ) : null;

  // TODO for later: use nice looking file upload component
  // <FileUpload
  //   value={field.value}
  //   onValueChange={field.onChange}
  //   accept="image/*"
  //   maxFiles={2}
  //   maxSize={5 * 1024 * 1024}
  //   onFileReject={(_, message) => {
  //     setError("files", {
  //       message
  //     });
  //   }}
  //   multiple
  // >
  //   <FileUploadDropzone className="flex-row border-dotted">
  //     <CloudUpload className="size-4" />
  //     Drag and drop or
  //     <FileUploadTrigger asChild>
  //       <Button variant="link" size="sm" className="p-0">
  //         choose files
  //       </Button>
  //     </FileUploadTrigger>
  //     to upload
  //   </FileUploadDropzone>
  //   <FileUploadList>
  //     {field.value.map((file, index) => (
  //       <FileUploadItem key={index} value={file}>
  //         <FileUploadItemPreview />
  //         <FileUploadItemMetadata />
  //         <FileUploadItemDelete asChild>
  //           <Button variant="ghost" size="icon" className="size-7">
  //             <X />
  //             <span className="sr-only">Delete</span>
  //           </Button>
  //         </FileUploadItemDelete>
  //       </FileUploadItem>
  //     ))}
  //   </FileUploadList>
  // </FileUpload>

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
        <SignUpDialog
          trigger={UploadButton}
          onSuccess={selectFile}
          customTitle="Create account to upload images"
          customDescription="You need to have an account to upload or change images."
        />
      )}
    </>
  );
}
