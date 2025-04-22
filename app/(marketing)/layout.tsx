import { ReactNode } from "react";
import { Header } from "../../components/header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header isMarketing />
      <main className="mt-14 h-[calc(100vh-56px)] min-h-0 sm:mt-16 sm:h-[calc(100vh-64px)]">
        {children}
      </main>
    </>
  );
}
