import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const SAMPLE = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

export async function GET() {
  const CELL = 108;
  const THICK = 6;
  const THIN = 2;

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
        {/* Header */}
        <div style={{ display: 'flex', borderBottom: '4px solid #000', padding: '40px 60px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 4, display: 'flex' }}>Daily</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'monospace', display: 'flex' }}>03:24</div>
            <div style={{ fontSize: 18, color: '#999', display: 'flex' }}>●●○</div>
          </div>
        </div>
        {/* Board */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', border: `${THICK}px solid #000` }}>
            {SAMPLE.map((row, r) => (
              <div key={r} style={{ display: 'flex', borderBottom: (r + 1) % 3 === 0 && r !== 8 ? `${THICK}px solid #000` : `${THIN}px solid #ccc` }}>
                {row.map((val, c) => (
                  <div
                    key={c}
                    style={{
                      width: CELL,
                      height: CELL,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: (c + 1) % 3 === 0 && c !== 8 ? `${THICK}px solid #000` : `${THIN}px solid #ccc`,
                      backgroundColor: r === 2 && c === 3 ? '#000' : 'transparent',
                      fontSize: 36,
                      fontWeight: 900,
                      color: r === 2 && c === 3 ? '#fff' : val ? '#000' : '#aaa',
                    }}
                  >
                    {val ?? ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Number pad */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '40px 60px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <div
              key={n}
              style={{
                width: 80,
                height: 88,
                border: '4px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}
