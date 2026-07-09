import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { cn } from '@/05_shared/lib/shadcn/utils';
import styles from './layout.module.css';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Nopeus GT',
    default: 'Nopeus GT — Gran Turismo 7 Setups Sharing Hub',
  },
  description: 'Manage and explore optimal setups, car details, and track data for Gran Turismo 7.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="relative min-h-screen bg-[#0B0F19] text-slate-200 overflow-hidden">
          <div className="fixed inset-0 z-0 pointer-events-none">

            <div
              className={cn(
                'absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/15 blur-[120px]',
                styles.spherePurple,
              )}
            />

            <div
              className={cn(
                'absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[150px]',
                styles.sphereBlue,
              )}
            />

            <div
              className={cn(
                'absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-red-600/5 blur-[150px]',
                styles.sphereRed,
              )}
            />
          </div>

          <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E')]" />

          <main className="relative z-10 container mx-auto px-6 lg:px-12 min-h-dvh w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
