export type Board = (number | null)[][];
export type Difficulty = 'easy' | 'medium' | 'hard';

const CLUE_COUNT: Record<Difficulty, number> = {
  easy: 38,
  medium: 30,
  hard: 24,
};

// Seeded pseudo-random number generator (mulberry32)
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isValid(board: Board, row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++) {
    for (let c = bc; c < bc + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

function fillBoard(board: Board, rng: () => number): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);
        for (const num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board, rng)) return true;
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function countSolutions(board: Board, limit = 2): number {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        let count = 0;
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            count += countSolutions(board, limit - count);
            board[row][col] = null;
            if (count >= limit) return count;
          }
        }
        return count;
      }
    }
  }
  return 1;
}

export function generatePuzzle(seed: number, difficulty: Difficulty): {
  puzzle: Board;
  solution: Board;
} {
  const rng = mulberry32(seed);

  const solution: Board = Array.from({ length: 9 }, () => Array(9).fill(null));
  fillBoard(solution, rng);

  const puzzle: Board = solution.map((row) => [...row]);
  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => i),
    rng,
  );

  const clues = CLUE_COUNT[difficulty];
  let removed = 0;
  const target = 81 - clues;

  for (const pos of positions) {
    if (removed >= target) break;
    const row = Math.floor(pos / 9);
    const col = pos % 9;
    const backup = puzzle[row][col];
    puzzle[row][col] = null;

    const copy: Board = puzzle.map((r) => [...r]);
    if (countSolutions(copy) === 1) {
      removed++;
    } else {
      puzzle[row][col] = backup;
    }
  }

  return { puzzle, solution };
}

export function isBoardComplete(board: Board, solution: Board): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== solution[r][c]) return false;
    }
  }
  return true;
}

// Convert hex block hash to a stable 32-bit integer seed
export function hashToSeed(hex: string): number {
  const h = hex.replace(/^0x/, '').slice(0, 8);
  return parseInt(h, 16) >>> 0;
}

// Derive a daily seed: use UTC date + block hash
export function dailySeed(blockHash: string): number {
  const today = new Date();
  const dateStr = `${today.getUTCFullYear()}${today.getUTCMonth()}${today.getUTCDate()}`;
  const datePart = parseInt(dateStr, 10) >>> 0;
  const hashPart = hashToSeed(blockHash);
  return (datePart ^ hashPart) >>> 0;
}
