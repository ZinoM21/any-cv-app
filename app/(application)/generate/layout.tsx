import { HEADER_CHILDREN_CLASS } from "@/styles/shared";
import { ReactNode } from "react";
import { ApplicationHeader } from "../components/breadcrumb-header";

export default function GeneratingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ApplicationHeader />
      <main className={HEADER_CHILDREN_CLASS}>{children}</main>
    </>
  );
}
