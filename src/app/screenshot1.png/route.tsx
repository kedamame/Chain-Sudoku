import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const maxDuration = 15;

export async function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
        {/* Header */}
        <div style={{ display: 'flex', borderBottom: '4px solid #000', paddingTop: 80, paddingBottom: 80, paddingLeft: 80, paddingRight: 80, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', display: 'flex' }}>Chain Sudoku</div>
          <div style={{ display: 'flex', border: '3px solid #000', paddingTop: 16, paddingBottom: 16, paddingLeft: 28, paddingRight: 28, fontSize: 20, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' }}>Connect</div>
        </div>
        {/* Stats */}
        <div style={{ display: 'flex', borderBottom: '3px solid #000' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, borderRight: '3px solid #000', paddingTop: 64, paddingBottom: 64, paddingLeft: 80, paddingRight: 80 }}>
            <div style={{ fontSize: 22, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Daily Clears</div>
            <div style={{ fontSize: 120, fontWeight: 900, display: 'flex', marginTop: 8 }}>12</div>
            <div style={{ fontSize: 18, color: '#ccc', letterSpacing: 4, textTransform: 'uppercase', display: 'flex', marginTop: 8 }}>On-chain</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: 64, paddingBottom: 64, paddingLeft: 80, paddingRight: 80 }}>
            <div style={{ fontSize: 22, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Random Clears</div>
            <div style={{ fontSize: 120, fontWeight: 900, display: 'flex', marginTop: 8 }}>47</div>
            <div style={{ fontSize: 18, color: '#ccc', letterSpacing: 4, textTransform: 'uppercase', display: 'flex', marginTop: 8 }}>On-chain</div>
          </div>
        </div>
        {/* Daily section */}
        <div style={{ display: 'flex', flexDirection: 'column', border: '3px solid #000', marginTop: 64, marginLeft: 80, marginRight: 80 }}>
          <div style={{ display: 'flex', borderBottom: '3px solid #000', paddingTop: 36, paddingBottom: 36, paddingLeft: 56, paddingRight: 56 }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', display: 'flex' }}>Daily</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 48, paddingBottom: 48, paddingLeft: 56, paddingRight: 56, gap: 40 }}>
            <div style={{ fontSize: 28, color: '#666', display: 'flex' }}>Today's puzzle - same for everyone on Base.</div>
            <div style={{ display: 'flex', backgroundColor: '#000', paddingTop: 44, paddingBottom: 44, paddingLeft: 56, paddingRight: 56, justifyContent: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: 8, textTransform: 'uppercase', color: '#fff', display: 'flex' }}>Play Daily</div>
            </div>
          </div>
        </div>
        {/* Random section */}
        <div style={{ display: 'flex', flexDirection: 'column', border: '3px solid #000', marginTop: 48, marginLeft: 80, marginRight: 80 }}>
          <div style={{ display: 'flex', borderBottom: '3px solid #000', paddingTop: 36, paddingBottom: 36, paddingLeft: 56, paddingRight: 56 }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', display: 'flex' }}>Random</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 40, paddingBottom: 40, paddingLeft: 56, paddingRight: 56, gap: 24 }}>
            {(['Easy', 'Medium', 'Hard'] as const).map((d) => (
              <div key={d} style={{ display: 'flex', border: '3px solid #000', paddingTop: 44, paddingBottom: 44, paddingLeft: 56, paddingRight: 56, justifyContent: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: 8, textTransform: 'uppercase', display: 'flex' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}
