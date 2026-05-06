'use client';

import React from 'react';
import type { Board } from '@/lib/sudoku';

interface Props {
  puzzle: Board;
  board: Board;
  selected: [number, number] | null;
  mistakes: number[];
  onSelect: (row: number, col: number) => void;
}

export default function SudokuBoard({ puzzle, board, selected, mistakes, onSelect }: Props) {
  return (
    <div
      className="inline-block border-2 border-black"
      style={{ lineHeight: 0 }}
    >
      {board.map((row, r) => (
        <div key={r} className="flex">
          {row.map((val, c) => {
            const isGiven = puzzle[r][c] !== null;
            const isSelected = selected?.[0] === r && selected?.[1] === c;
            const isWrong = mistakes.includes(r * 9 + c);
            const isSameNum =
              selected &&
              board[selected[0]][selected[1]] !== null &&
              val !== null &&
              val === board[selected[0]][selected[1]];
            const isRelated =
              selected &&
              (selected[0] === r ||
                selected[1] === c ||
                (Math.floor(selected[0] / 3) === Math.floor(r / 3) &&
                  Math.floor(selected[1] / 3) === Math.floor(c / 3)));

            const borderRight = (c + 1) % 3 === 0 && c !== 8 ? 'border-r-2 border-r-black' : 'border-r border-r-gray-300';
            const borderBottom = (r + 1) % 3 === 0 && r !== 8 ? 'border-b-2 border-b-black' : 'border-b border-b-gray-300';

            const isUserFilled = !isGiven && val !== null;

            let bg = 'bg-white';
            if (isSelected) bg = 'bg-black';
            else if (isWrong) bg = 'bg-red-100';
            else if (isSameNum) bg = 'bg-gray-300';
            else if (isRelated) bg = isUserFilled ? 'bg-blue-100' : 'bg-gray-100';
            else if (isUserFilled) bg = 'bg-blue-50';

            let textColor = 'text-black';
            if (isSelected) textColor = 'text-white';
            else if (isWrong) textColor = 'text-red-600';
            else if (!isGiven) textColor = 'text-gray-500';

            return (
              <div
                key={c}
                onClick={() => !isGiven && onSelect(r, c)}
                className={[
                  'w-9 h-9 flex items-center justify-center',
                  'text-sm font-bold select-none',
                  borderRight,
                  borderBottom,
                  bg,
                  textColor,
                  !isGiven ? 'cursor-pointer' : 'cursor-default',
                ].join(' ')}
              >
                {val ?? ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
