import './App.css';
import { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { getAIPlayers } from './api/gameApi';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import type { AIPlayerInfo, Player, AIPlayerSettings } from './types/game';

function App() {
  const { screen, gameState, passedPlayer, handleStartGame, handleCellClick, handleReset } = useGameState();
  const [aiPlayers, setAiPlayers] = useState<AIPlayerInfo[]>([]);
  const [selectedMode, setSelectedMode] = useState<'pvp' | 'ai'>('pvp');
  const [selectedAI, setSelectedAI] = useState<string>('');
  const [selectedAIColor, setSelectedAIColor] = useState<Player>(2);

  useEffect(() => {
    const fetchAIPlayers = async () => {
      try {
        const players = await getAIPlayers();
        setAiPlayers(players);
        if (players.length > 0) {
          setSelectedAI(players[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch AI players:', error);
      }
    };

    fetchAIPlayers();
  }, []);

  const handleStartGameClick = () => {
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

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-lg w-full">
          <h1 className="text-7xl font-bold text-white mb-6 tracking-wider">
            REVERSI
          </h1>
          <p className="text-xl text-gray-400 mb-12 font-light">
            Strategy Board Game
          </p>

          {/* Game Mode Selection */}
          <div className="mb-8 bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Game Mode</h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedMode('pvp')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  selectedMode === 'pvp'
                    ? 'bg-green-800 border-2 border-green-600'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                Player vs Player
              </button>
              <button
                onClick={() => setSelectedMode('ai')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
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
              <div className="space-y-4">
                {/* AI Player Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-left">
                    AI Player
                  </label>
                  <select
                    value={selectedAI}
                    onChange={(e) => setSelectedAI(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    {aiPlayers.map((ai) => (
                      <option key={ai.id} value={ai.id} className="bg-gray-900">
                        {ai.name}
                      </option>
                    ))}
                  </select>
                  {selectedAI && aiPlayers.find(ai => ai.id === selectedAI) && (
                    <p className="text-xs text-gray-400 mt-2 text-left">
                      {aiPlayers.find(ai => ai.id === selectedAI)?.description}
                    </p>
                  )}
                </div>

                {/* AI Color Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-left">
                    AI Color
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedAIColor(1)}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                        selectedAIColor === 1
                          ? 'bg-gray-800 border-2 border-gray-600'
                          : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-800 to-black" />
                      Black
                    </button>
                    <button
                      onClick={() => setSelectedAIColor(2)}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                        selectedAIColor === 2
                          ? 'bg-gray-100 text-gray-900 border-2 border-gray-300'
                          : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-100 to-white" />
                      White
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleStartGameClick}
            className="px-12 py-4 bg-green-800 hover:bg-green-700 border border-green-700 rounded-lg font-semibold text-lg transition-all duration-200 shadow-xl w-full"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  // Playing / Game Over Screen
  // Get AI info if playing against AI
  const aiInfo = gameState.aiPlayer
    ? {
        name: aiPlayers.find(ai => ai.id === gameState.aiPlayer?.aiPlayerId)?.name || 'AI Player',
        color: gameState.aiPlayer.aiColor,
      }
    : undefined;

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      {/* Pass Notification Toast */}
      {passedPlayer && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg font-semibold">
            {passedPlayer === 1 ? 'Black' : 'White'} passed - No legal moves
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
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
          onReset={handleReset}
          isAIThinking={gameState.isLoading && gameState.aiPlayer !== undefined}
          aiInfo={aiInfo}
        />
      </div>
    </div>
  );
}

export default App;


