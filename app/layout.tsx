import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: { default: 'Omnicord Documentation', template: '%s | Omnicord Docs' },
  description: 'Your complete guide to the ultimate Ben 10 themed Discord bot.',
  metadataBase: new URL('https://docs.omnicord.site'),
  icons: { icon: 'https://omnicord.neocities.org/pfp.png' },
  openGraph: {
    type: 'website',
    siteName: 'Omnicord',
    images: 'https://lunarfrost.neocities.org/assets/bg.png',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            options: {
              type: 'static',
              from: '/api/search',
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}