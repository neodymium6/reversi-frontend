import type { CellState } from '../types/game';
import Piece from './Piece';

interface CellProps {
    state: CellState;
    isLegalMove: boolean;
    onClick: () => void;
}

export default function Cell({ state, isLegalMove, onClick }: CellProps) {
    return (
        <div
            onClick={onClick}
            className={`
        w-16 h-16
        bg-green-800
        border border-green-700
        flex items-center justify-center
        cursor-pointer
        transition-all duration-200
        ${isLegalMove ? 'hover:bg-green-700 ring-1 ring-inset ring-green-500' : ''}
        ${state !== 0 ? 'cursor-default' : ''}
      `}
        >
            {state !== 0 ? (
                <Piece state={state} />
            ) : isLegalMove ? (
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
            ) : null}
        </div>
    );
}
