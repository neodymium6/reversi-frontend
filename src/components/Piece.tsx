import type { CellState } from '../types/game';

interface PieceProps {
    state: CellState;
}

export default function Piece({ state }: PieceProps) {
    if (state === 0) return null;

    const isBlack = state === 1;

    return (
        <div
            className={`
        w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full
        ${isBlack ? 'bg-gradient-to-br from-gray-800 to-black' : 'bg-gradient-to-br from-gray-100 to-white'}
        shadow-lg
        transform transition-all duration-300
        hover:scale-105
      `}
        >
            {/* Inner highlight for 3D effect */}
            <div
                className={`
          w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full m-1.5 sm:m-2
          ${isBlack ? 'bg-gray-700/50' : 'bg-white/80'}
        `}
            />
        </div>
    );
}
