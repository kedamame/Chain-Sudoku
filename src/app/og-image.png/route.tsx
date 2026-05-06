import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 80,
            paddingRight: 80,
            borderBottom: '4px solid #000',
          }}
        >
          <div style={{ fontSize: 14, letterSpacing: 8, color: '#999', textTransform: 'uppercase', display: 'flex' }}>
            Farcaster Mini App
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -2, display: 'flex', marginTop: 8 }}>
            Chain Sudoku
          </div>
          <div style={{ fontSize: 24, color: '#666', marginTop: 16, display: 'flex' }}>
            Daily puzzles seeded from Base blockchain
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            paddingLeft: 80,
            paddingRight: 80,
            paddingTop: 24,
            paddingBottom: 24,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 14, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>
            Powered by Base
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Easy', 'Medium', 'Hard'].map((d) => (
              <div
                key={d}
                style={{
                  fontSize: 12,
                  letterSpacing: 4,
                  color: '#999',
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
