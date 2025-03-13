import { usePDF } from "@react-pdf/renderer";
import { ResumeDocument } from "./resume-two";
import { Document, Page } from "react-pdf";
import { ProfileData } from "@/lib/types";
import { useEffect } from "react";
import { useProfileStore } from "@/hooks/use-profile";

export const PDF = ({ data }: { data: ProfileData }) => {
  const profileData = useProfileStore((state) => state.profile);

  const document = <ResumeDocument data={data} />;

  const [instance, update] = usePDF({
    document,
  });

  useEffect(() => {
    update(document);
  }, [profileData]);

  return (
    <Document file={instance.url}>
      <Page pageNumber={1} width={1000} />
    </Document>
  );
};
