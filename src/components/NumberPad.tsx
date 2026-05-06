'use client';

interface Props {
  onInput: (n: number | null) => void;
  counts: number[];
}

export default function NumberPad({ onInput, counts }: Props) {
  return (
    <div className="flex gap-2 mt-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <button
          key={n}
          onClick={() => onInput(n)}
          disabled={counts[n] >= 9}
          className={[
            'w-9 h-10 border-2 border-black text-sm font-bold',
            'flex flex-col items-center justify-center leading-none',
            counts[n] >= 9
              ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
              : 'bg-white text-black hover:bg-black hover:text-white transition-colors',
          ].join(' ')}
        >
          <span>{n}</span>
          {counts[n] > 0 && counts[n] < 9 && (
            <span className="text-[8px] font-normal opacity-50">{9 - counts[n]}</span>
          )}
        </button>
      ))}
      <button
        onClick={() => onInput(null)}
        className="w-9 h-10 border-2 border-black text-xs font-bold bg-white hover:bg-black hover:text-white transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
