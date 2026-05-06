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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
        }}
      >
        {/* 3x3 Sudoku grid icon */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '32px solid #fff',
            width: 700,
            height: 700,
          }}
        >
          {[0, 1, 2].map((r) => (
            <div key={r} style={{ display: 'flex', flex: 1 }}>
              {[0, 1, 2].map((c) => (
                <div
                  key={c}
                  style={{
                    flex: 1,
                    border: '12px solid #fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 8,
                      backgroundColor: (r + c) % 2 === 0 ? '#ffffff' : 'transparent',
                      display: 'flex',
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1024, height: 1024 },
  );
}
