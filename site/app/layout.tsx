import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={jetBrainsMono.variable} suppressHydrationWarning>
      <body>
        <RootProvider theme={{ forcedTheme: 'dark', defaultTheme: 'dark' }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
