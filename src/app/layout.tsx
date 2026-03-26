import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from '@/components/layout/theme-provider';
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
    default: 'FrontLog — Подготовка к frontend-собеседованиям',
  },
  description: 'Flashcard-система с интервальным повторением для frontend-разработчиков. Готовься к собеседованиям по JavaScript, TypeScript, React, Next.js и CSS.',
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
