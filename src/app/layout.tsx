import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://chain-sudoku.vercel.app';

const splashImageUrl = `${APP_URL}/splash.png`;
const embedImageUrl = `${APP_URL}/embed.png`;

const miniAppEmbed = {
  version: '1',
  imageUrl: embedImageUrl,
  button: {
    title: 'Play Now',
    action: {
      type: 'launch_miniapp',
      name: 'Chain Sudoku',
      url: APP_URL,
      splashImageUrl,
      splashBackgroundColor: '#000000',
    },
  },
};

const frameEmbed = {
  version: 'next',
  imageUrl: embedImageUrl,
  button: {
    title: 'Play Now',
    action: {
      type: 'launch_frame',
      name: 'Chain Sudoku',
      url: APP_URL,
      splashImageUrl,
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
    'fc:frame': JSON.stringify(frameEmbed),
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
