import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sellora AI — Генерация продающих фото для маркетплейсов",
  description:
    "AI-генерация фото и карточек для Wildberries, Ozon, Яндекс.Маркет. В 10 раз дешевле конкурентов. Цифровой двойник товара, предиктор CTR, полная карточка за 1 клик.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
