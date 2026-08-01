import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://guidr-empire.pages.dev'),
  title: 'GUIDR EMPIRE | 2026 AI Survival Protocols & Career Intelligence',
  description: 'Protect your career from AI displacement. Access 8K digital guides, ChatGPT/Claude prompt banks, and automation blueprints for 20+ professions across USA, UK, Europe, and Sri Lanka.',
  keywords: [
    'AI survival guide',
    'will AI replace my job 2026',
    'AI automation for lawyers',
    'dentist AI tools',
    'accountant AI survival blueprint',
    'GeniuzLab intelligence',
    'AI risk assessment report'
  ],
  authors: [{ name: 'GeniuzLab Intelligence Unit', url: 'https://geniuzlab.com' }],
  openGraph: {
    title: 'GUIDR EMPIRE | 2026 AI Survival Protocols & Career Intelligence',
    description: 'Master the specialized AI prompt protocols, free tools, and automation systems that make your career irreplaceable.',
    url: 'https://guidr-empire.pages.dev',
    siteName: 'GUIDR EMPIRE',
    images: [
      {
        url: 'https://guidr-empire.pages.dev/images/hero_ai_engine.jpg',
        width: 1200,
        height: 630,
        alt: 'GeniuzLab GUIDR EMPIRE AI Engine',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GUIDR EMPIRE | 2026 AI Survival Protocols',
    description: 'Protect your career from AI displacement. 8K digital guides & ChatGPT prompt banks.',
    images: ['https://guidr-empire.pages.dev/images/hero_ai_engine.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD Rich Snippet for Google Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'GUIDR EMPIRE',
    'operatingSystem': 'Web-based',
    'applicationCategory': 'BusinessApplication',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '2480',
    },
    'offers': {
      '@type': 'Offer',
      'price': '29.00',
      'priceCurrency': 'GBP',
    },
    'author': {
      '@type': 'Organization',
      'name': 'GeniuzLab',
      'url': 'https://geniuzlab.com',
    },
  };

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-[#060A14] text-[#F8F6F0] font-sans antialiased selection:bg-[#C9A84C] selection:text-[#060A14]">
        {children}
      </body>
    </html>
  );
}
