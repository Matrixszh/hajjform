import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caravan 72 | Hajj 2027",
  description:
    "A premium Hajj landing page for Caravan 72, designed to mirror the provided travel brochure reference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
