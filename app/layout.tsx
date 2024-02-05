import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "cyrillic", "greek", "cyrillic-ext", "greek-ext", "latin-ext", "vietnamese"], weight: ["100", "300", "400", "500", "700", "900"]
});

export const metadata: Metadata = {
  title: "BlogDev",
  description: "Generated by Duy Phan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
