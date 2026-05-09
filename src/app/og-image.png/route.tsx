import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const maxDuration = 15;

const GRID = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const C = 44;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Left: text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            paddingLeft: 80,
            paddingRight: 48,
          }}
        >
          <div style={{ display: 'flex', fontSize: 13, letterSpacing: 8, color: '#999', textTransform: 'uppercase' }}>
            Farcaster Mini App
          </div>
          <div style={{ display: 'flex', fontSize: 80, fontWeight: 900, letterSpacing: -2, marginTop: 8 }}>
            Chain Sudoku
          </div>
          <div style={{ display: 'flex', fontSize: 20, color: '#555', marginTop: 16 }}>
            Daily puzzles seeded from Base blockchain
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: 40, gap: 12 }}>
            <div style={{ display: 'flex', paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14, border: '2px solid #000', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>Daily</div>
            <div style={{ display: 'flex', paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14, border: '2px solid #000', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>Random</div>
            <div style={{ display: 'flex', paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14, border: '2px solid #000', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>On-Chain</div>
          </div>
          <div style={{ display: 'flex', fontSize: 12, letterSpacing: 5, color: '#aaa', textTransform: 'uppercase', marginTop: 32 }}>
            Powered by Base
          </div>
        </div>

        {/* Right: Sudoku grid */}
        <div
          style={{
            display: 'flex',
            width: 500,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '3px solid #000',
              borderTop: '3px solid #000',
            }}
          >
            {GRID.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', flexDirection: 'row' }}>
                {row.map((val, ci) => (
                  <div
                    key={ci}
                    style={{
                      display: 'flex',
                      width: C,
                      height: C,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: ci % 3 === 2 ? '3px solid #000' : '1px solid #ccc',
                      borderBottom: ri % 3 === 2 ? '3px solid #000' : '1px solid #ccc',
                      backgroundColor: val ? '#fff' : '#f9f9f9',
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1a1a1a',
                    }}
                  >
                    {val ? String(val) : ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
