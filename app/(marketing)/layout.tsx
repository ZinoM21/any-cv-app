import { Header } from "@/app/(marketing)/components/header";
import { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mt-14 sm:mt-16 h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)]">
        {children}
      </main>
    </>
  );
}
