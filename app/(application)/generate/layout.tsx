import { HEADER_CHILDREN_CLASS } from "@/styles/shared";
import { ReactNode } from "react";
import { Header } from "../../../components/header";
import BreadCrumb from "../breadcrumb";

export default function GeneratingLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header breadcrumb={<BreadCrumb />} />
      <main className={HEADER_CHILDREN_CLASS}>{children}</main>
    </>
  );
}
