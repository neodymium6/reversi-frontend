import type { CellState } from '../types/game';
import Piece from './Piece';

interface CellProps {
    state: CellState;
    isLegalMove: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export default function Cell({ state, isLegalMove, onClick, disabled = false }: CellProps) {
    const handleClick = () => {
        if (disabled) return;
        onClick();
    };

    return (
        <div
            onClick={handleClick}
            className={`
        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
        bg-green-800
        border border-green-700
        flex items-center justify-center
        transition-all duration-200
        ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
        ${!disabled && isLegalMove ? 'hover:bg-green-700 ring-1 ring-inset ring-green-500' : ''}
        ${state !== 0 ? 'cursor-default' : ''}
      `}
        >
            {state !== 0 ? (
                <Piece state={state} />
            ) : isLegalMove ? (
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-400/70" />
            ) : null}
        </div>
    );
}
