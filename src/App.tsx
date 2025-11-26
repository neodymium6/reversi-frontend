import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { useGameState } from './hooks/useGameState';
import { getAIPlayers } from './api/gameApi';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import GameOverModal from './components/GameOverModal';
import type { AIPlayerInfo, Player, AIPlayerSettings } from './types/game';

function App() {
  const { screen, gameState, passedPlayer, handleStartGame, handleCellClick, handleReset } = useGameState();
  const [aiPlayers, setAiPlayers] = useState<AIPlayerInfo[]>([]);
  const [selectedMode, setSelectedMode] = useState<'pvp' | 'ai'>('pvp');
  const [selectedAI, setSelectedAI] = useState<string>('');
  const [selectedAIColor, setSelectedAIColor] = useState<Player>(2);
  const [hasClosedGameOverModal, setHasClosedGameOverModal] = useState(false);

  const handleResetWithRefresh = () => {
    setHasClosedGameOverModal(false);
    handleReset();
    fetchAIPlayers();
  };

  const fetchAIPlayers = useCallback(async () => {
    try {
      const players = await getAIPlayers();
      setAiPlayers(players);
      setSelectedAI((prev) => {
        if (prev && players.some((player) => player.id === prev)) {
          return prev;
        }
        return players[0]?.id || '';
      });
    } catch (error) {
      console.error('Failed to fetch AI players:', error);
    }
  }, []);

  useEffect(() => {
    fetchAIPlayers();
  }, [fetchAIPlayers]);

  const handleStartGameClick = () => {
    setHasClosedGameOverModal(false);
    if (selectedMode === 'ai' && selectedAI) {
      const aiSettings: AIPlayerSettings = {
        aiPlayerId: selectedAI,
        aiColor: selectedAIColor,
      };
      handleStartGame(aiSettings);
    } else {
      handleStartGame();
    }
  };

  const formatPercentage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A';
    return `${Math.round(value * 100)}%`;
  };

  const formatScore = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A';
    return value.toFixed(1);
  };

  const selectedAIPlayer = selectedAI ? aiPlayers.find(ai => ai.id === selectedAI) : undefined;

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="text-center max-w-lg w-full">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-wider">
            REVERSI
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 md:mb-12 font-light">
            Strategy Board Game
          </p>

          {/* Game Mode Selection */}
          <div className="mb-6 sm:mb-8 bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Game Mode</h2>
            <div className="flex gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
              <button
                onClick={() => setSelectedMode('pvp')}
                className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 ${
                  selectedMode === 'pvp'
                    ? 'bg-green-800 border-2 border-green-600'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                Player vs Player
              </button>
              <button
                onClick={() => setSelectedMode('ai')}
                className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 ${
                  selectedMode === 'ai'
                    ? 'bg-green-800 border-2 border-green-600'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                Player vs AI
              </button>
            </div>

            {/* AI Settings (shown only when AI mode is selected) */}
            {selectedMode === 'ai' && (
              <div className="space-y-3 sm:space-y-4">
                {/* AI Player Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2 text-left">
                    AI Player
                  </label>
                  <select
                    value={selectedAI}
                    onChange={(e) => setSelectedAI(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    {aiPlayers.map((ai) => (
                      <option key={ai.id} value={ai.id} className="bg-gray-900 text-white">
                        {ai.name}
                      </option>
                    ))}
                  </select>
                  {selectedAIPlayer && (
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 text-left">
                      {selectedAIPlayer.description}
                    </p>
                  )}
                  {selectedAIPlayer?.statistics && (
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="bg-white/5 rounded-lg p-3 text-left">
                        <p className="text-[11px] sm:text-xs text-gray-400">Games</p>
                        <p className="font-semibold">{selectedAIPlayer.statistics.totalGames}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-left">
                        <p className="text-[11px] sm:text-xs text-gray-400">Win Rate</p>
                        <p className="font-semibold">{formatPercentage(selectedAIPlayer.statistics.winRate)}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-left">
                        <p className="text-[11px] sm:text-xs text-gray-400">Black Win Rate</p>
                        <p className="font-semibold">{formatPercentage(selectedAIPlayer.statistics.asBlackWinRate)}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-left">
                        <p className="text-[11px] sm:text-xs text-gray-400">White Win Rate</p>
                        <p className="font-semibold">{formatPercentage(selectedAIPlayer.statistics.asWhiteWinRate)}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-left col-span-2">
                        <p className="text-[11px] sm:text-xs text-gray-400">Average Score</p>
                        <p className="font-semibold">{formatScore(selectedAIPlayer.statistics.averageScore)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Color Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-2 text-left">
                    AI Color
                  </label>
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => setSelectedAIColor(1)}
                      className={`flex-1 py-2 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 ${
                        selectedAIColor === 1
                          ? 'bg-gray-800 border-2 border-gray-600'
                          : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-gray-800 to-black flex-shrink-0" />
                      <span>Black</span>
                    </button>
                    <button
                      onClick={() => setSelectedAIColor(2)}
                      className={`flex-1 py-2 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 ${
                        selectedAIColor === 2
                          ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                          : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-gray-100 to-white flex-shrink-0" />
                      <span>White</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleStartGameClick}
            className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-green-800 hover:bg-green-700 border border-green-700 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-xl w-full"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  // Playing / Game Over Screen
  // Get AI info if playing against AI
  const activeAIPlayer = gameState.aiPlayer
    ? aiPlayers.find(ai => ai.id === gameState.aiPlayer?.aiPlayerId)
    : undefined;

  const aiInfo = gameState.aiPlayer
    ? {
        name: activeAIPlayer?.name || 'AI Player',
        color: gameState.aiPlayer.aiColor,
        statistics: activeAIPlayer?.statistics,
      }
    : undefined;

  const shouldShowGameOverModal = gameState.gameOver && !hasClosedGameOverModal;

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-8">
      {/* Pass Notification Toast */}
      {passedPlayer && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg font-semibold">
            {passedPlayer === 1 ? 'Black' : 'White'} passed - No legal moves
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {shouldShowGameOverModal && (
        <GameOverModal
          winner={gameState.winner}
          score={gameState.score}
          onPlayAgain={() => {
            handleResetWithRefresh();
          }}
          onClose={() => setHasClosedGameOverModal(true)}
          aiInfo={gameState.aiPlayer ? { color: gameState.aiPlayer.aiColor } : undefined}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-center lg:items-start w-full max-w-6xl">
        {/* Board */}
        <Board
          board={gameState.board}
          legalMoves={gameState.legalMoves}
          onCellClick={handleCellClick}
          disabled={gameState.isLoading}
        />

        {/* Game Info */}
        <GameInfo
          currentPlayer={gameState.currentPlayer}
          score={gameState.score}
          gameOver={gameState.gameOver}
          winner={gameState.winner}
          onReset={handleResetWithRefresh}
          isAIThinking={gameState.isLoading && gameState.aiPlayer !== undefined}
          aiInfo={aiInfo}
        />
      </div>
    </div>
  );
}

export default App;
