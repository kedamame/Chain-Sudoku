import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const maxDuration = 15;

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
          <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'monospace', display: 'flex' }}>08:05</div>
        </div>

        {/* Clear card */}
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 80, paddingRight: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', border: '4px solid #000', width: '100%' }}>
            {/* Title */}
            <div style={{ display: 'flex', borderBottom: '4px solid #000', paddingTop: 64, paddingBottom: 64, paddingLeft: 80, paddingRight: 80 }}>
              <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: 4, textTransform: 'uppercase', display: 'flex' }}>Clear!</div>
            </div>
            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 56, paddingBottom: 56, paddingLeft: 80, paddingRight: 80, gap: 48 }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 20, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Time</div>
                <div style={{ fontSize: 64, fontWeight: 900, fontFamily: 'monospace', display: 'flex', marginTop: 8 }}>08:05</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 20, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Mistakes</div>
                <div style={{ fontSize: 64, fontWeight: 900, display: 'flex', marginTop: 8 }}>0</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', borderTop: '2px solid #eee', paddingTop: 56, paddingBottom: 56, paddingLeft: 80, paddingRight: 80, gap: 48 }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 20, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Daily Clears</div>
                <div style={{ fontSize: 64, fontWeight: 900, display: 'flex', marginTop: 8 }}>1</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 20, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Random Clears</div>
                <div style={{ fontSize: 64, fontWeight: 900, display: 'flex', marginTop: 8 }}>1</div>
              </div>
            </div>
            {/* Saved on Base */}
            <div style={{ display: 'flex', flexDirection: 'row', borderTop: '2px solid #eee', paddingTop: 36, paddingBottom: 36, paddingLeft: 80, paddingRight: 80, justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 20, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Saved on Base</div>
              <div style={{ fontSize: 20, color: '#aaa', display: 'flex', textDecoration: 'underline' }}>Basescan</div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 48, gap: 24 }}>
            <div style={{ display: 'flex', backgroundColor: '#000', paddingTop: 52, paddingBottom: 52, paddingLeft: 80, paddingRight: 80, justifyContent: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 8, textTransform: 'uppercase', color: '#fff', display: 'flex' }}>Share on Farcaster</div>
            </div>
            <div style={{ display: 'flex', border: '4px solid #000', paddingTop: 52, paddingBottom: 52, paddingLeft: 80, paddingRight: 80, justifyContent: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 8, textTransform: 'uppercase', display: 'flex' }}>Home</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}
