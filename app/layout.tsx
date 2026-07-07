import type { Metadata } from "next";
import { Noto_Sans_JP, Playfair_Display } from "next/font/google";

import { LanguageProvider } from "@/components/ui/LanguageProvider";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"]
});

export const metadata: Metadata = {
  title: "COSMO GROUP Recruiting",
  description:
    "Cosmo Group recruiting website for Cosmo, Create, and Holistic Cures."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} ${playfair.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
