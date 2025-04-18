import { ReactNode } from "react";

export function GenericHeader({ children }: { children: ReactNode }) {
  return (
    <header className="fixed flex items-center inset-x-0 top-0 z-50 bg-background/85 backdrop-blur-[4px] border-grid border-b h-14 sm:h-16">
      {children}
    </header>
  );
}
