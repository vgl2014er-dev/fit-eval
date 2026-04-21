import type { Metadata, Viewport } from 'next';
import { Anton, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
  icons: {
    icon: '/android/launchericon-192x192.png',
    apple: '/android/launchericon-192x192.png',
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
        {children}
      </body>
    </html>
  );
}
