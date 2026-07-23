import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hajj Journey | Hajj 2027",
  description:
    " We take care of every flight, visa, accommodation,transport, and every detail so you can focus on your ibadah with peace of mind.",
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
