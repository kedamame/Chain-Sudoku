'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Board, Difficulty } from '@/lib/sudoku';
import { generatePuzzle, isBoardComplete } from '@/lib/sudoku';

export type GameStatus = 'playing' | 'won';

interface GameState {
  puzzle: Board;
  board: Board;
  solution: Board;
  selected: [number, number] | null;
  mistakes: number[];
  mistakeCount: number;
  status: GameStatus;
  elapsed: number;
  difficulty: Difficulty;
  numCounts: number[];
  gameKey: number;
}

function computeCounts(board: Board): number[] {
  const counts = new Array(10).fill(0);
  for (const row of board) {
    for (const v of row) {
      if (v !== null) counts[v]++;
    }
  }
  return counts;
}

export function useGame(seed: number, difficulty: Difficulty) {
  const [state, setState] = useState<GameState>(() => {
    const { puzzle, solution } = generatePuzzle(seed, difficulty);
    const board = puzzle.map((r) => [...r]);
    return {
      puzzle,
      board,
      solution,
      selected: null,
      mistakes: [],
      mistakeCount: 0,
      status: 'playing' as GameStatus,
      elapsed: 0,
      difficulty,
      numCounts: computeCounts(board),
      gameKey: 0,
    };
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAt = useRef<number>(Date.now());

  useEffect(() => {
    if (state.status !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    startedAt.current = Date.now() - state.elapsed * 1000;
    timerRef.current = setInterval(() => {
      setState((s) => ({ ...s, elapsed: Math.floor((Date.now() - startedAt.current) / 1000) }));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, state.gameKey]);

  const select = useCallback((row: number, col: number) => {
    setState((s) => ({ ...s, selected: [row, col] }));
  }, []);

  const input = useCallback((n: number | null) => {
    setState((s) => {
      if (!s.selected || s.status !== 'playing') return s;
      const [r, c] = s.selected;
      if (s.puzzle[r][c] !== null) return s;

      const board = s.board.map((row) => [...row]);
      board[r][c] = n;

      let mistakes = s.mistakes.filter((pos) => pos !== r * 9 + c);
      let mistakeCount = s.mistakeCount;

      if (n !== null && n !== s.solution[r][c]) {
        mistakes = [...mistakes, r * 9 + c];
        mistakeCount = s.mistakeCount + 1;
      }

      const status: GameStatus = isBoardComplete(board, s.solution) ? 'won' : 'playing';

      return {
        ...s,
        board,
        mistakes,
        mistakeCount,
        status,
        numCounts: computeCounts(board),
      };
    });
  }, []);

  const reset = useCallback((newSeed: number, newDifficulty: Difficulty) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const { puzzle, solution } = generatePuzzle(newSeed, newDifficulty);
    const board = puzzle.map((r) => [...r]);
    startedAt.current = Date.now();
    setState((s) => ({
      puzzle,
      board,
      solution,
      selected: null,
      mistakes: [],
      mistakeCount: 0,
      status: 'playing',
      elapsed: 0,
      difficulty: newDifficulty,
      numCounts: computeCounts(board),
      gameKey: s.gameKey + 1,
    }));
  }, []);

  return { ...state, select, input, reset };
}
