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
        <div style={{ display: 'flex', borderBottom: '4px solid #000', padding: '48px 60px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 4, textTransform: 'uppercase', display: 'flex' }}>Chain Sudoku</div>
        </div>
        {/* Stats */}
        <div style={{ display: 'flex', borderBottom: '2px solid #000' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, borderRight: '2px solid #000', padding: '48px 60px' }}>
            <div style={{ fontSize: 16, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Daily Clears</div>
            <div style={{ fontSize: 96, fontWeight: 900, display: 'flex' }}>12</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '48px 60px' }}>
            <div style={{ fontSize: 16, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>Random Clears</div>
            <div style={{ fontSize: 96, fontWeight: 900, display: 'flex' }}>47</div>
          </div>
        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '60px', gap: 32 }}>
          <div style={{ display: 'flex', border: '4px solid #000', backgroundColor: '#000', padding: '36px 48px' }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', color: '#fff', display: 'flex' }}>Play Daily</div>
          </div>
          <div style={{ display: 'flex', border: '4px solid #000', padding: '36px 48px', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', display: 'flex' }}>Easy</div>
          </div>
          <div style={{ display: 'flex', border: '4px solid #000', padding: '36px 48px', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', display: 'flex' }}>Medium</div>
          </div>
          <div style={{ display: 'flex', border: '4px solid #000', padding: '36px 48px', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 6, textTransform: 'uppercase', display: 'flex' }}>Hard</div>
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}
