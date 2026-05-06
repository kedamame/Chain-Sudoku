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
          backgroundColor: '#000000',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Mini grid */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '4px solid #fff',
              marginBottom: 40,
            }}
          >
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ display: 'flex' }}>
                {[0, 1, 2].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 48,
                      height: 48,
                      border: '2px solid #555',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        backgroundColor: (r + c) % 2 === 0 ? '#ffffff' : 'transparent',
                        display: 'flex',
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', letterSpacing: 2, display: 'flex' }}>
            Chain Sudoku
          </div>
          <div style={{ fontSize: 16, color: '#666', marginTop: 12, letterSpacing: 4, textTransform: 'uppercase', display: 'flex' }}>
            Tap to play
          </div>
        </div>
      </div>
    ),
    { width: 900, height: 600 },
  );
}
