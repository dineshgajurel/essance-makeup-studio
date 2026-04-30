import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Essance | Unisex Makeup Studio | Nepal",
  description: "Essance Unisex Makeup Studio in Nepal. Elevating Beauty, Naturally. A perfect blend of nature, mountains, and beauty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col font-main">{children}</body>
    </html>
  );
}
