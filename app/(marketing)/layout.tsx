import { HEADER_CHILDREN_CLASS } from "@/styles/shared";
import { ReactNode } from "react";
import { Header } from "../../components/header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header isMarketing />
      <main className={HEADER_CHILDREN_CLASS}>{children}</main>
    </>
  );
}
