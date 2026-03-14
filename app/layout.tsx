import type { Metadata, Viewport } from 'next';
import { Anton, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import PWARegister from '@/components/PWARegister';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'SYS.FITNESS.EVAL',
  description: 'Technical fitness test execution and ranking system',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FIT.EVAL',
  },
};

export const viewport: Viewport = {
  themeColor: '#E2FF31',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${anton.variable} ${mono.variable}`}>
      <body className="bg-ink text-white antialiased selection:bg-volt selection:text-ink" suppressHydrationWarning>
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
