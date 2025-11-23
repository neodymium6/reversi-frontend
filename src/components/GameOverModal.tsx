import type { Player, Score } from '../types/game';

interface AIInfo {
    color: Player;
}

interface GameOverModalProps {
    winner: Player | null;
    score: Score;
    onPlayAgain: () => void;
    onClose: () => void;
    aiInfo?: AIInfo;
}

export default function GameOverModal({
    winner,
    score,
    onPlayAgain,
    onClose,
    aiInfo,
}: GameOverModalProps) {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 border border-white/20">
                {/* Game Over Title */}
                <h2 className="text-4xl font-bold text-white mb-6 text-center tracking-wide">
                    GAME OVER
                </h2>

                {/* Winner Announcement */}
                <div className="mb-8 p-6 bg-white/5 rounded-xl text-center">
                    {winner === null ? (
                        <div>
                            <p className="text-3xl font-bold text-yellow-400 mb-2">
                                Draw!
                            </p>
                            <p className="text-gray-300">
                                Both players have the same score
                            </p>
                        </div>
                    ) : aiInfo ? (
                        // AI game: Show "You win!" or "AI wins!"
                        <div>
                            <p className="text-xl text-gray-300 mb-2">Winner</p>
                            <p className="text-4xl font-bold mb-2">
                                {winner === aiInfo.color ? '🤖 AI Wins!' : '🎉 You Win!'}
                            </p>
                            <p className="text-gray-400 text-sm">
                                ({winner === 1 ? 'Black' : 'White'})
                            </p>
                        </div>
                    ) : (
                        // PvP game: Show color winner
                        <div>
                            <p className="text-xl text-gray-300 mb-2">Winner</p>
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <div
                                    className={`w-8 h-8 rounded-full ${
                                        winner === 1
                                            ? 'bg-gradient-to-br from-gray-800 to-black'
                                            : 'bg-gradient-to-br from-gray-100 to-white'
                                    }`}
                                />
                                <p className="text-4xl font-bold">
                                    {winner === 1 ? 'Black' : 'White'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Final Score */}
                <div className="mb-8 p-6 bg-white/5 rounded-xl">
                    <p className="text-xl font-bold text-center mb-4 text-white tracking-wide">
                        FINAL SCORE
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-800 to-black" />
                                <span className="font-semibold">Black</span>
                            </div>
                            <span className="text-3xl font-bold">{score.black}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-white" />
                                <span className="font-semibold">White</span>
                            </div>
                            <span className="text-3xl font-bold">{score.white}</span>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={onPlayAgain}
                        className="w-full py-3 px-4 bg-green-800 hover:bg-green-700 border border-green-700 rounded-lg font-semibold text-lg transition-all duration-200"
                    >
                        Play Again
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg font-semibold transition-all duration-200"
                    >
                        Back to Board
                    </button>
                </div>
            </div>
        </div>
    );
}
