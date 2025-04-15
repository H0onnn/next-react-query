import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "@/shared/providers";

export const metadata: Metadata = {
  title: "Next React Query Example",
  description: "Using Next.js with React Query in SSR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
