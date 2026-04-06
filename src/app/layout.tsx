import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from '@/widgets/navbar/ui/theme-provider';
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frontlog.ru';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | FrontLog',
    default: 'FrontLog — Вопросы на frontend собеседование с ответами',
  },
  description: 'Подготовка к frontend собеседованию с карточками и интервальным повторением. Вопросы и ответы по JavaScript, TypeScript, React, Next.js, CSS, алгоритмам. Учи эффективно — как в Anki.',
  keywords: ['frontend собеседование', 'вопросы на собеседование фронтенд', 'подготовка к собеседованию javascript', 'react вопросы собеседование', 'typescript вопросы', 'frontend interview', 'флеш карточки программирование', 'интервальное повторение'],
  openGraph: {
    type: 'website',
    siteName: 'FrontLog',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
