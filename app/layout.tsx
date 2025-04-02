import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { geistSans } from "@/styles/fonts";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "BuiltAnyCV",
  description: "CV & Site in seconds",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Providers session={session}>
          <div className="bg-gradient-to-b from-primary/20 to-background">
            {children}
          </div>
          <Toaster position="top-center" richColors closeButton theme="light" />
        </Providers>
      </body>
    </html>
  );
}
