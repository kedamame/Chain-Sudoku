'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import SudokuBoard from './SudokuBoard';
import NumberPad from './NumberPad';
import { useGame } from '@/hooks/useGame';
import { useOnChainClears } from '@/hooks/useOnChainClears';
import type { Difficulty } from '@/lib/sudoku';
import { dailySeed } from '@/lib/sudoku';
import {
  getDailyClears,
  getRandomClears,
  incrementDailyClears,
  incrementRandomClears,
  isDailyCompleted,
} from '@/lib/storage';
import { composeCast } from '@/lib/farcaster';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://chain-sudoku.vercel.app';
const BASE_RPC = 'https://mainnet.base.org';

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

async function fetchBlockHash(): Promise<string> {
  try {
    const res = await fetch(BASE_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_getBlockByNumber', params: ['latest', false] }),
    });
    const json = await res.json();
    return json.result?.hash ?? '0xdeadbeef';
  } catch {
    return '0xdeadbeef';
  }
}

type Mode = 'home' | 'daily' | 'random';

export default function GameScreen() {
  const [mode, setMode] = useState<Mode>('home');
  const [dailySeedVal, setDailySeedVal] = useState<number>(12345);
  const [randomSeed, setRandomSeed] = useState<number>(Math.floor(Math.random() * 0xffffffff));
  const [randomDifficulty, setRandomDifficulty] = useState<Difficulty>('medium');
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const [localDailyClears, setLocalDailyClears] = useState(0);
  const [localRandomClears, setLocalRandomClears] = useState(0);
  const [clearedThisRound, setClearedThisRound] = useState(false);
  const [savedOnChain, setSavedOnChain] = useState(false);
  const [pendingRetry, setPendingRetry] = useState(false);

  // Wallet
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // On-chain clears
  const onChain = useOnChainClears();

  // Display counts: on-chain if connected + deployed, else localStorage
  const dailyClears = (isConnected && onChain.isContractDeployed && onChain.onChainDaily !== null)
    ? onChain.onChainDaily
    : localDailyClears;
  const randomClears = (isConnected && onChain.isContractDeployed && onChain.onChainRandom !== null)
    ? onChain.onChainRandom
    : localRandomClears;

  useEffect(() => {
    setDailyCompleted(isDailyCompleted());
    setLocalDailyClears(getDailyClears());
    setLocalRandomClears(getRandomClears());
  }, []);

  useEffect(() => {
    fetchBlockHash().then((hash) => setDailySeedVal(dailySeed(hash)));
  }, []);

  const game = useGame(
    mode === 'daily' ? dailySeedVal : randomSeed,
    mode === 'daily' ? 'medium' : randomDifficulty,
  );

  // Handle win — update localStorage only (on-chain is manual button)
  useEffect(() => {
    if (game.status === 'won' && !clearedThisRound) {
      setClearedThisRound(true);
      setSavedOnChain(false);
      if (mode === 'daily' && !isDailyCompleted()) {
        const n = incrementDailyClears();
        setLocalDailyClears(n);
        setDailyCompleted(true);
      } else if (mode === 'random') {
        const n = incrementRandomClears();
        setLocalRandomClears(n);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.status, clearedThisRound, mode]);

  // Mark saved after tx confirmed
  useEffect(() => {
    if (onChain.isSuccess && !savedOnChain) setSavedOnChain(true);
  }, [onChain.isSuccess, savedOnChain]);

  // After reset() clears txError, fire the retry increment
  useEffect(() => {
    if (pendingRetry && !onChain.txError) {
      setPendingRetry(false);
      onChain.increment(mode === 'daily' ? 'daily' : 'random');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingRetry, onChain.txError]);

  const startDaily = useCallback(() => {
    setClearedThisRound(false);
    setSavedOnChain(false);
    onChain.reset();
    setMode('daily');
    game.reset(dailySeedVal, 'medium');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailySeedVal, game]);

  const startRandom = useCallback((diff: Difficulty) => {
    const seed = Math.floor(Math.random() * 0xffffffff);
    setRandomSeed(seed);
    setRandomDifficulty(diff);
    setClearedThisRound(false);
    setSavedOnChain(false);
    onChain.reset();
    setMode('random');
    game.reset(seed, diff);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  const handleShare = useCallback(async () => {
    const dc = dailyClears;
    const rc = randomClears;
    const timeStr = formatTime(game.elapsed);
    const diffLabel = game.difficulty === 'easy' ? 'Easy' : game.difficulty === 'medium' ? 'Medium' : 'Hard';
    const modeLabel = mode === 'daily' ? 'Daily' : 'Random';
    const text = [
      `Chain Sudoku - ${modeLabel} (${diffLabel})`,
      `Time: ${timeStr} | Mistakes: ${game.mistakeCount}/3`,
      ``,
      `Daily clears: ${dc}`,
      `Random clears: ${rc}`,
    ].join('\n');
    const ogUrl = `${APP_URL}/og?dc=${dc}&rc=${rc}&time=${timeStr}&diff=${diffLabel}&mode=${modeLabel}`;
    await composeCast(text, [ogUrl]);
  }, [dailyClears, randomClears, game.elapsed, game.mistakeCount, game.difficulty, mode]);

  // On-chain tx status label
  const txStatus = onChain.isSending
    ? 'Confirm in wallet...'
    : onChain.isConfirming
    ? 'Saving to Base...'
    : savedOnChain
    ? 'Saved on Base ✓'
    : null;

  const txFailed = !!onChain.txError;

  // ── Home screen ──────────────────────────────────────────────
  if (mode === 'home') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="border-b-2 border-black px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-widest uppercase">Chain Sudoku</h1>
          {/* Wallet */}
          {isConnected && address ? (
            <button
              onClick={() => disconnect()}
              className="text-[10px] tracking-widest uppercase border border-black px-2 py-1 hover:bg-black hover:text-white transition-colors"
            >
              {shortAddress(address)}
            </button>
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="text-[10px] tracking-widest uppercase border-2 border-black px-2 py-1 font-bold hover:bg-black hover:text-white transition-colors"
            >
              Connect
            </button>
          )}
        </header>

        <div className="flex-1 px-6 py-8 flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-2 border-2 border-black">
            <div className="border-r-2 border-black p-4">
              <p className="text-xs tracking-widest uppercase text-gray-400">Daily Clears</p>
              <p className="text-4xl font-black mt-1">{dailyClears}</p>
              {isConnected && onChain.isContractDeployed && (
                <p className="text-[9px] text-gray-300 uppercase tracking-widest mt-1">On-chain</p>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs tracking-widest uppercase text-gray-400">Random Clears</p>
              <p className="text-4xl font-black mt-1">{randomClears}</p>
              {isConnected && onChain.isContractDeployed && (
                <p className="text-[9px] text-gray-300 uppercase tracking-widest mt-1">On-chain</p>
              )}
            </div>
          </div>

          {/* Daily */}
          <div className="border-2 border-black">
            <div className="border-b-2 border-black px-4 py-3 flex items-center justify-between">
              <span className="text-xs tracking-widest uppercase font-bold">Daily</span>
              {dailyCompleted && (
                <span className="text-xs tracking-widest uppercase text-gray-400">Completed</span>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-4">
                {dailyCompleted
                  ? "Today's puzzle is done. Come back tomorrow!"
                  : "Today's puzzle — same for everyone on Base."}
              </p>
              <button
                onClick={startDaily}
                disabled={dailyCompleted}
                className={[
                  'w-full py-3 text-sm font-bold tracking-widest uppercase border-2 border-black',
                  dailyCompleted
                    ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-white hover:text-black transition-colors',
                ].join(' ')}
              >
                {dailyCompleted ? 'Completed' : 'Play Daily'}
              </button>
            </div>
          </div>

          {/* Random */}
          <div className="border-2 border-black">
            <div className="border-b-2 border-black px-4 py-3">
              <span className="text-xs tracking-widest uppercase font-bold">Random</span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => startRandom(diff)}
                  className="w-full py-3 border-2 border-black text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                >
                  {diff === 'easy' ? 'Easy' : diff === 'medium' ? 'Medium' : 'Hard'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Game screen ───────────────────────────────────────────────
  const diffLabel = game.difficulty === 'easy' ? 'Easy' : game.difficulty === 'medium' ? 'Medium' : 'Hard';
  const modeLabel = mode === 'daily' ? 'Daily' : 'Random';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b-2 border-black px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMode('home')}
          className="text-xs tracking-widest uppercase font-bold hover:underline"
        >
          ← Back
        </button>
        <div className="text-center">
          <p className="text-xs tracking-widest uppercase font-black">{modeLabel}</p>
          <p className="text-[10px] text-gray-400 tracking-wider uppercase">{diffLabel}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono font-bold">{formatTime(game.elapsed)}</p>
          <p className="text-[10px] text-gray-400">
            {'●'.repeat(game.mistakeCount)}{'○'.repeat(3 - game.mistakeCount)}
          </p>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-4">
        {game.status === 'playing' && (
          <>
            <SudokuBoard
              puzzle={game.puzzle}
              board={game.board}
              selected={game.selected}
              mistakes={game.mistakes}
              onSelect={game.select}
            />
            <NumberPad onInput={game.input} counts={game.numCounts} />
          </>
        )}

        {game.status === 'won' && (
          <div className="w-full max-w-sm border-2 border-black">
            <div className="border-b-2 border-black px-6 py-4">
              <h2 className="text-2xl font-black tracking-widest uppercase">Clear!</h2>
            </div>
            <div className="px-6 py-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-gray-400">Time</p>
                  <p className="text-xl font-black font-mono">{formatTime(game.elapsed)}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-gray-400">Mistakes</p>
                  <p className="text-xl font-black">{game.mistakeCount} / 3</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-gray-400">Daily Clears</p>
                  <p className="text-xl font-black">{dailyClears}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-gray-400">Random Clears</p>
                  <p className="text-xl font-black">{randomClears}</p>
                </div>
              </div>

              {/* Save to blockchain button */}
              {onChain.isContractDeployed && (
                <>
                  {!isConnected && (
                    <button
                      onClick={() => connect({ connector: connectors[0] })}
                      className="w-full py-3 border-2 border-black text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                    >
                      Connect to Save on Base
                    </button>
                  )}
                  {isConnected && !savedOnChain && !onChain.isSending && !onChain.isConfirming && (
                    <>
                      <button
                        disabled={pendingRetry}
                        onClick={() => {
                          if (txFailed) {
                            onChain.reset();
                            setPendingRetry(true);
                          } else {
                            onChain.increment(mode === 'daily' ? 'daily' : 'random');
                          }
                        }}
                        className="w-full py-3 border-2 border-black text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {txFailed ? 'Retry Save' : 'Save to Blockchain'}
                      </button>
                      {txFailed && (
                        <p className="text-[10px] tracking-widest uppercase text-red-500 text-center">
                          Transaction rejected. Tap to retry.
                        </p>
                      )}
                    </>
                  )}
                  {isConnected && (onChain.isSending || onChain.isConfirming || savedOnChain) && (
                    <div className="border border-gray-200 px-4 py-2 flex items-center justify-between">
                      <p className="text-[10px] tracking-widest uppercase text-gray-400">{txStatus}</p>
                      {onChain.txHash && savedOnChain && (
                        <a
                          href={`https://basescan.org/tx/${onChain.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] underline text-gray-500"
                        >
                          Basescan
                        </a>
                      )}
                    </div>
                  )}
                </>
              )}

              <button
                onClick={handleShare}
                className="w-full py-3 bg-black text-white text-sm font-bold tracking-widest uppercase border-2 border-black hover:bg-white hover:text-black transition-colors"
              >
                Share on Farcaster
              </button>
              {mode === 'random' && (
                <button
                  onClick={() => startRandom(game.difficulty)}
                  className="w-full py-3 border-2 border-black text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Next Puzzle
                </button>
              )}
              <button
                onClick={() => setMode('home')}
                className="w-full py-3 border-2 border-black text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        )}

        {game.status === 'lost' && (
          <div className="w-full max-w-sm border-2 border-black">
            <div className="border-b-2 border-black px-6 py-4">
              <h2 className="text-2xl font-black tracking-widest uppercase">Game Over</h2>
            </div>
            <div className="px-6 py-4 flex flex-col gap-3">
              <p className="text-sm text-gray-500">3 mistakes reached.</p>
              {mode === 'random' && (
                <button
                  onClick={() => startRandom(game.difficulty)}
                  className="w-full py-3 bg-black text-white text-sm font-bold tracking-widest uppercase border-2 border-black hover:bg-white hover:text-black transition-colors"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={() => setMode('home')}
                className="w-full py-3 border-2 border-black text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
