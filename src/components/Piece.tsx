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
        w-12 h-12 rounded-full
        ${isBlack ? 'bg-gradient-to-br from-gray-800 to-black' : 'bg-gradient-to-br from-gray-100 to-white'}
        shadow-lg
        transform transition-all duration-300
        hover:scale-105
      `}
        >
            {/* Inner highlight for 3D effect */}
            <div
                className={`
          w-3 h-3 rounded-full m-2
          ${isBlack ? 'bg-gray-700/50' : 'bg-white/80'}
        `}
            />
        </div>
    );
}
