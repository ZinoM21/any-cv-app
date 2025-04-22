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
      <main className="mt-14 h-[calc(100vh-56px)] min-h-0 sm:mt-16 sm:h-[calc(100vh-64px)]">
        {children}
      </main>
    </>
  );
}
