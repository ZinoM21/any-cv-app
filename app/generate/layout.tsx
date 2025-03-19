import { ReactNode } from "react";
import { BreadcrumpHeader } from "./components/breadcrumb-header";

export default function GeneratingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <BreadcrumpHeader />
      <main className="mt-16 h-[calc(100vh-64px)]">{children}</main>
    </>
  );
}
