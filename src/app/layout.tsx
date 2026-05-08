import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://chain-sudoku.vercel.app';

const miniAppEmbed = {
  version: '1',
  imageUrl: `${APP_URL}/opengraph-image`,
  button: {
    title: 'Play Now',
    action: {
      type: 'launch_miniapp',
      name: 'Chain Sudoku',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#000000',
    },
  },
};

export const metadata: Metadata = {
  title: 'Chain Sudoku',
  description: 'Daily Sudoku puzzles seeded from the Base blockchain',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'Chain Sudoku',
    description: 'Daily Sudoku puzzles seeded from the Base blockchain',
    type: 'website',
    images: ['/og-image.png'],
  },
  other: {
    'fc:miniapp': JSON.stringify(miniAppEmbed),
    'base:app_id': '69fd6ff15dd32baeb8d5836e',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
