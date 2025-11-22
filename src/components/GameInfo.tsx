import type { Player, Score } from '../types/game';

interface GameInfoProps {
    currentPlayer: Player;
    score: Score;
    gameOver: boolean;
    winner: Player | null;
    onReset: () => void;
}

export default function GameInfo({
    currentPlayer,
    score,
    gameOver,
    winner,
    onReset,
}: GameInfoProps) {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl min-w-[250px]">
            {/* Score Display */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-center text-white tracking-wide">
                    SCORE
                </h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-800 to-black" />
                            <span className="font-semibold">Black</span>
                        </div>
                        <span className="text-2xl font-bold">{score.black}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-white" />
                            <span className="font-semibold">White</span>
                        </div>
                        <span className="text-2xl font-bold">{score.white}</span>
                    </div>
                </div>
            </div>

            {/* Current Turn / Game Status */}
            <div className="mb-6 p-4 bg-white/5 rounded-lg">
                {gameOver ? (
                    <div className="text-center">
                        <p className="text-sm text-gray-300 mb-1">Game Over</p>
                        <p className="text-lg font-bold">
                            {winner === null ? (
                                <span className="text-yellow-400">Draw!</span>
                            ) : (
                                <span className={winner === 1 ? 'text-gray-200' : 'text-gray-100'}>
                                    {winner === 1 ? 'Black' : 'White'} Wins!
                                </span>
                            )}
                        </p>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-sm text-gray-300 mb-1">Current Turn</p>
                        <div className="flex items-center justify-center gap-2">
                            <div
                                className={`w-4 h-4 rounded-full ${currentPlayer === 1
                                    ? 'bg-gradient-to-br from-gray-800 to-black'
                                    : 'bg-gradient-to-br from-gray-100 to-white'
                                    }`}
                            />
                            <span className="text-lg font-bold">
                                {currentPlayer === 1 ? 'Black' : 'White'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Reset Button */}
            <button
                onClick={onReset}
                className="w-full py-3 px-4 bg-green-800 hover:bg-green-700 border border-green-700 rounded-lg font-semibold transition-all duration-200"
            >
                {gameOver ? 'Play Again' : 'Reset Game'}
            </button>
        </div>
    );
}
