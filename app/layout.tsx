import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import DefaultSearchDialog from '@/components/search';
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
const componentEmbed = {
  component: {
    type: 17,
    accent_color: 5793266,
    components: [
      {
        type: 10,
        content: '<:admin:1568888770546372649>  **Omnicord** > Overview',
      },
      {
        type: 10,
        content:
          '[Omnicord Documentation - Overview](https://docs.omnicord.site)\nList of every Omnicord command and details on them, so you never get lost using the bot.',
      },
      { type: 14, spacing: 1 },
      {
        type: 10,
        content:
          '<:link:1568891315461029978> [Support](https://discord.gg/bHDYB6MW5Y) • <:link:1568891315461029978> [FAQ](https://omnicord.site/faq)',
      },
    ],
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`} suppressHydrationWarning>
      <head>
        <script
          id="discord:component-embed"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(componentEmbed) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            SearchDialog: DefaultSearchDialog,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}