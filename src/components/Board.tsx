import type { BoardState, Position } from '../types/game';
import Cell from './Cell';

interface BoardProps {
    board: BoardState;
    legalMoves: Position[];
    onCellClick: (position: Position) => void;
    disabled?: boolean;
}

export default function Board({ board, legalMoves, onCellClick, disabled = false }: BoardProps) {
    const isLegalMove = (row: number, col: number): boolean => {
        return legalMoves.some((move) => move.row === row && move.col === col);
    };

    return (
        <div className="inline-block p-4 bg-green-950 rounded-xl shadow-2xl">
            <div className="grid grid-cols-8 gap-0">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            state={cell}
                            isLegalMove={isLegalMove(rowIndex, colIndex)}
                            onClick={() => onCellClick({ row: rowIndex, col: colIndex })}
                            disabled={disabled}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
