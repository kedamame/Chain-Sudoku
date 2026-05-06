import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 15;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dc = searchParams.get('dc') ?? '0';
  const rc = searchParams.get('rc') ?? '0';
  const time = searchParams.get('time') ?? '--:--';
  const diff = searchParams.get('diff') ?? 'Medium';
  const mode = searchParams.get('mode') ?? 'Daily';

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
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '4px solid #000',
            paddingLeft: 60,
            paddingRight: 60,
            paddingTop: 40,
            paddingBottom: 40,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 14, letterSpacing: 8, color: '#999', textTransform: 'uppercase', display: 'flex' }}>
              Chain Sudoku
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: 2, display: 'flex' }}>
              {mode.toUpperCase()}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 14, letterSpacing: 4, color: '#999', textTransform: 'uppercase', display: 'flex' }}>
              {diff}
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, fontFamily: 'monospace', display: 'flex' }}>
              {time}
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'flex', flex: 1 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              borderRight: '2px solid #000',
              paddingLeft: 60,
              paddingRight: 60,
              paddingTop: 60,
              paddingBottom: 60,
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 13, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>
              Daily Clears
            </div>
            <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1, display: 'flex' }}>
              {dc}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              paddingLeft: 60,
              paddingRight: 60,
              paddingTop: 60,
              paddingBottom: 60,
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 13, letterSpacing: 6, color: '#aaa', textTransform: 'uppercase', display: 'flex' }}>
              Random Clears
            </div>
            <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1, display: 'flex' }}>
              {rc}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            borderTop: '2px solid #000',
            paddingLeft: 60,
            paddingRight: 60,
            paddingTop: 24,
            paddingBottom: 24,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 13, letterSpacing: 4, color: '#999', textTransform: 'uppercase', display: 'flex' }}>
            Powered by Base
          </div>
          <div style={{ fontSize: 13, letterSpacing: 4, color: '#999', display: 'flex' }}>
            chain-sudoku.vercel.app
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
