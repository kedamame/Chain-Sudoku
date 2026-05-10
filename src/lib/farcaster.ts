'use client';

import { useEffect, useState, useRef } from 'react';

interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

interface FarcasterState {
  isInMiniApp: boolean;
  isLoading: boolean;
  user: FarcasterUser | null;
  sdk: unknown;
}

export function useFarcasterMiniApp(): FarcasterState {
  const [state, setState] = useState<FarcasterState>({
    isInMiniApp: false,
    isLoading: true,
    user: null,
    sdk: null,
  });
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    import('@farcaster/miniapp-sdk')
      .then(async ({ sdk }) => {
        // Call ready() immediately so the splash screen dismisses
        sdk.actions.ready();

        const isMiniApp = await sdk.isInMiniApp();
        if (!isMiniApp) {
          setState({ isInMiniApp: false, isLoading: false, user: null, sdk: null });
          return;
        }

        try {
          const ethProvider = await sdk.wallet.getEthereumProvider();
          if (ethProvider && typeof window !== 'undefined') {
            (window as unknown as Record<string, unknown>).ethereum = ethProvider;
          }
        } catch {
          // no wallet provider
        }

        let user: FarcasterUser | null = null;
        try {
          const context = await sdk.context;
          if (context?.user) {
            const u = context.user as Record<string, unknown>;
            user = {
              fid: u.fid as number,
              username: u.username as string | undefined,
              displayName: u.displayName as string | undefined,
              pfpUrl: u.pfpUrl as string | undefined,
            };
          }
        } catch {
          // no context
        }

        setState({ isInMiniApp: true, isLoading: false, user, sdk });
      })
      .catch(() => {
        setState({ isInMiniApp: false, isLoading: false, user: null, sdk: null });
      });
  }, []);

  return state;
}

export async function composeCast(text: string, embeds?: string[]) {
  try {
    const { sdk } = await import('@farcaster/miniapp-sdk');
    const typedEmbeds = embeds as [] | [string] | [string, string] | undefined;
    await sdk.actions.composeCast({ text, embeds: typedEmbeds });
  } catch {
    // fallback: open Warpcast compose URL
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
}
