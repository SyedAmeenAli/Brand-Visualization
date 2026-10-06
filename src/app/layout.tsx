import type { Metadata, Viewport } from 'next';
import { Fraunces, IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { NO_FLASH_SCRIPT } from '@/lib/theme';
import { Providers } from '@/components/Providers';

const display = Fraunces({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-display', display: 'swap' });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600'], variable: '--font-arabic', display: 'swap' });

const TITLE = 'AQARATI — Brand Experience';
const DESCRIPTION = 'Explore the identity, visual language and digital expression of AQARATI.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3210'),
  title: { default: TITLE, template: '%s — AQARATI' },
  description: DESCRIPTION,
  applicationName: 'AQARATI',
  keywords: ['AQARATI', 'عقاراتي', 'brand identity', 'Oman', 'property', 'brand guidelines'],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'AQARATI',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'AQARATI عقاراتي — Your Property Journey' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.png'] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ECE3D7' },
    { media: '(prefers-color-scheme: dark)', color: '#211E1B' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: TITLE,
  alternateName: ['AQARATI', 'عقاراتي'],
  description: DESCRIPTION,
  inLanguage: ['en', 'ar'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="light" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
      <head>
        <script suppressHydrationWarning>{NO_FLASH_SCRIPT}</script>
        <script type="application/ld+json" suppressHydrationWarning>{jsonLd}</script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
