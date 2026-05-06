import { NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://chain-sudoku.vercel.app';

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: 'REPLACE_WITH_WARPCAST_MANIFEST_HEADER',
      payload: 'REPLACE_WITH_WARPCAST_MANIFEST_PAYLOAD',
      signature: 'REPLACE_WITH_WARPCAST_MANIFEST_SIGNATURE',
    },
    miniapp: {
      version: '1',
      name: 'Chain Sudoku',
      homeUrl: APP_URL,
      iconUrl: `${APP_URL}/icon.png`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#000000',
      subtitle: 'Daily Sudoku on Base',
      description: 'Daily Sudoku puzzles seeded from the Base blockchain. Track your daily and random clear counts.',
      screenshotUrls: [
        `${APP_URL}/screenshot1.png`,
        `${APP_URL}/screenshot2.png`,
      ],
      primaryCategory: 'games',
      tags: ['sudoku', 'puzzle', 'daily', 'base', 'game'],
      heroImageUrl: `${APP_URL}/og-image.png`,
      tagline: 'Daily puzzles on Base',
      ogTitle: 'Chain Sudoku',
      ogDescription: 'Daily Sudoku puzzles seeded from Base blockchain',
      ogImageUrl: `${APP_URL}/og-image.png`,
      requiredChains: ['eip155:8453'],
      requiredCapabilities: [],
      noindex: false,
    },
  });
}
