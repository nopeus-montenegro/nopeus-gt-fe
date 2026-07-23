import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { cn } from '@/05_shared/lib/shadcn/utils';

import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/05_shared/ui/shadcn/popover';
import { Copyright, Info } from 'lucide-react';
import './globals.css';
import styles from './layout.module.css';

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

            <Popover>
              <PopoverTrigger className="fixed z-40 bottom-6 right-6">
                <div
                  // onClick={toggleDrawer}
                  className={cn(
                    'group',
                    'm-0 px-2 py-2',
                    'flex items-center gap-2',
                    'rounded-full border border-secondary/5 bg-secondary/10',
                    'text-sm font-medium text-slate-200/90',
                    'shadow-xl backdrop-blur-md transition-transform',
                    'hover:scale-105 active:scale-95',
                  )}
                >
                  <Info className="w-7 h-7 text-white/90" />
                  <span className="hidden md:group-hover:block mr-1">Info</span>
                </div>
              </PopoverTrigger>

              <PopoverContent align="end" className="border border-secondary/5 bg-primary/20 backdrop-blur-lg">
                <PopoverHeader className="flex flex-col gap-4">
                  <PopoverTitle className="flex gap-1 text-white/80">
                    <span>Copyright</span>
                    <Copyright className="w-5 h-5" />
                    <span>2026 Nopeus DOO</span>
                  </PopoverTitle>
                  <PopoverDescription className="flex flex-col gap-4 text-white/40">
                    <span>
                      Nopeus&nbsp;GT is an independent project developed by Nopeus&nbsp;DOO and
                      is not affiliated with, authorized, maintained, sponsored or endorsed by
                      Sony&nbsp;Interactive&nbsp;Entertainment&nbsp;Inc, Polyphony&nbsp;Digital&nbsp;Inc or Gran&nbsp;Turismo.
                    </span>

                    <span>
                      All game content, images, car names, track names, logos and
                      trademarks belong to their respective owners - Sony&nbsp;Interactive&nbsp;Entertainment&nbsp;Inc,
                      Polyphony&nbsp;Digital&nbsp;Inc and respective automotive manufacturers.
                    </span>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </main>
        </div>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
