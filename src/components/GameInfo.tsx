import type { Player, Score } from '../types/game';

interface AIInfo {
    name: string;
    color: Player;
}

interface GameInfoProps {
    currentPlayer: Player;
    score: Score;
    gameOver: boolean;
    winner: Player | null;
    onReset: () => void;
    isAIThinking?: boolean;
    aiInfo?: AIInfo;
}

export default function GameInfo({
    currentPlayer,
    score,
    gameOver,
    winner,
    onReset,
    isAIThinking = false,
    aiInfo,
}: GameInfoProps) {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl w-full lg:min-w-[250px] lg:w-auto">
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
                                className={`w-4 h-4 rounded-full ${
                                    isAIThinking ? 'animate-pulse' : ''
                                } ${currentPlayer === 1
                                    ? 'bg-gradient-to-br from-gray-800 to-black'
                                    : 'bg-gradient-to-br from-gray-100 to-white'
                                    }`}
                            />
                            <span className="text-lg font-bold">
                                {currentPlayer === 1 ? 'Black' : 'White'}
                            </span>
                        </div>
                        {aiInfo && (
                            <div className="mt-3 text-sm h-5 flex items-center justify-center">
                                {isAIThinking ? (
                                    <span className="text-green-400 animate-pulse">
                                        🤖 AI is thinking...
                                    </span>
                                ) : currentPlayer !== aiInfo.color ? (
                                    <span className="text-blue-400">
                                        👤 Your Turn
                                    </span>
                                ) : (
                                    <span className="text-gray-500">
                                        🤖 AI's Turn
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* AI Player Info */}
            {aiInfo && (
                <div className="mb-6 p-4 bg-white/5 rounded-lg">
                    <div className="text-xs text-gray-300 mb-1 text-center">Playing Against</div>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-semibold">🤖 {aiInfo.name}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-2">
                        <div
                            className={`w-3 h-3 rounded-full ${
                                aiInfo.color === 1
                                    ? 'bg-gradient-to-br from-gray-800 to-black'
                                    : 'bg-gradient-to-br from-gray-100 to-white'
                            }`}
                        />
                        <span className="text-xs text-gray-300">
                            {aiInfo.color === 1 ? 'Black' : 'White'}
                        </span>
                    </div>
                </div>
            )}

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
