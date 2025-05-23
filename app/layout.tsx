import { auth, signOut } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { geistSans } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BuildAnyCV",
  description: "CV & Site in seconds"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    signOut({ redirectTo: "/signin" });
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Providers session={session}>
          <div className="bg-gradient-to-b from-primary/20 to-background">
            {children}
          </div>
          <Toaster position="top-center" richColors closeButton theme="light" />
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
