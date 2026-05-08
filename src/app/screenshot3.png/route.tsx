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
        {/* Header */}
        <div style={{ display: 'flex', borderBottom: '4px solid #000', padding: '40px 60px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 4, display: 'flex' }}>Random</div>
          <div style={{ fontSize: 14, letterSpacing: 4, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Hard</div>
        </div>

        {/* Clear screen */}
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px', gap: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', border: '4px solid #000', width: '100%' }}>
            <div style={{ display: 'flex', borderBottom: '4px solid #000', padding: '48px 60px' }}>
              <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: 4, display: 'flex' }}>Clear!</div>
            </div>
            <div style={{ display: 'flex', padding: '48px 60px', gap: 48 }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 14, letterSpacing: 4, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Time</div>
                <div style={{ fontSize: 48, fontWeight: 900, fontFamily: 'monospace', display: 'flex' }}>07:43</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 14, letterSpacing: 4, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Mistakes</div>
                <div style={{ fontSize: 48, fontWeight: 900, display: 'flex' }}>1 / 3</div>
              </div>
            </div>
            <div style={{ display: 'flex', borderTop: '2px solid #000', padding: '48px 60px', gap: 48 }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 14, letterSpacing: 4, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Daily Clears</div>
                <div style={{ fontSize: 48, fontWeight: 900, display: 'flex' }}>12</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 14, letterSpacing: 4, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Random Clears</div>
                <div style={{ fontSize: 48, fontWeight: 900, display: 'flex' }}>47</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', marginTop: 40 }}>
            <div style={{ display: 'flex', backgroundColor: '#000', padding: '40px 60px' }}>
              <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', color: '#fff', display: 'flex' }}>Share on Farcaster</div>
            </div>
            <div style={{ display: 'flex', border: '4px solid #000', padding: '40px 60px' }}>
              <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', display: 'flex' }}>Next Puzzle</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}
