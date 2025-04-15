import { ReactNode } from "react";
import { BreadcrumpHeader } from "./components/breadcrumb-header";

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <BreadcrumpHeader />
      <main className="mt-14 sm:mt-16 h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)]">
        {children}
      </main>
    </>
  );
}
