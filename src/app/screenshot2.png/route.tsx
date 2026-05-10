import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const maxDuration = 15;

const GRID = [
  [9, 0, 0, 8, 0, 1, 0, 3, 0],
  [7, 0, 0, 0, 0, 3, 0, 5, 0],
  [2, 1, 3, 6, 5, 0, 0, 9, 0],
  [0, 6, 0, 3, 0, 0, 0, 0, 0],
  [0, 0, 7, 0, 0, 4, 0, 0, 0],
  [3, 0, 1, 0, 7, 0, 2, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 8, 5],
  [0, 7, 0, 5, 0, 0, 0, 0, 1],
  [5, 3, 0, 0, 0, 0, 6, 0, 0],
];

const USER_FILLED = new Set([2 * 9 + 1, 2 * 9 + 2]);

const CELL = 108;
const THICK = 6;
const THIN = 2;

export async function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
        {/* Header */}
        <div style={{ display: 'flex', borderBottom: '4px solid #000', paddingTop: 56, paddingBottom: 56, paddingLeft: 80, paddingRight: 80, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 4, display: 'flex' }}>Back</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', display: 'flex' }}>Daily</div>
            <div style={{ fontSize: 22, color: '#aaa', letterSpacing: 4, textTransform: 'uppercase', display: 'flex' }}>Medium</div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'monospace', display: 'flex' }}>03:42</div>
        </div>
        {/* Board */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `${THICK}px solid #000`, borderTop: `${THICK}px solid #000` }}>
            {GRID.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', flexDirection: 'row' }}>
                {row.map((val, ci) => {
                  const idx = ri * 9 + ci;
                  const isUser = USER_FILLED.has(idx);
                  return (
                    <div
                      key={ci}
                      style={{
                        width: CELL,
                        height: CELL,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRight: ci % 3 === 2 ? `${THICK}px solid #000` : `${THIN}px solid #ccc`,
                        borderBottom: ri % 3 === 2 ? `${THICK}px solid #000` : `${THIN}px solid #ccc`,
                        backgroundColor: isUser ? '#eff6ff' : '#fff',
                        fontSize: 40,
                        fontWeight: 700,
                        color: isUser ? '#2563eb' : '#000',
                      }}
                    >
                      {val ? String(val) : ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        {/* Number pad */}
        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 48, paddingBottom: 80, paddingLeft: 60, paddingRight: 60, gap: 8 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <div
              key={n}
              style={{ flex: 1, height: 120, border: '4px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 900, gap: 4 }}
            >
              <div style={{ display: 'flex' }}>{n}</div>
              <div style={{ display: 'flex', fontSize: 20, color: '#aaa', fontWeight: 400 }}>{9 - n}</div>
            </div>
          ))}
          <div style={{ flex: 1, height: 120, border: '4px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900 }}>
            X
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}
