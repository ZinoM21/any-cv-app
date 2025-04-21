import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { geistSans } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BuiltAnyCV",
  description: "CV & Site in seconds"
};

export default async function RootLayout({
  children
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
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
