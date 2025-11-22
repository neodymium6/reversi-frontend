import './App.css';
import { useGameState } from './hooks/useGameState';
import Board from './components/Board';
import GameInfo from './components/GameInfo';

function App() {
  const { screen, gameState, passedPlayer, handleStartGame, handleCellClick, handleReset } = useGameState();

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-6 tracking-wider">
            REVERSI
          </h1>
          <p className="text-xl text-gray-400 mb-12 font-light">
            Strategy Board Game
          </p>
          <button
            onClick={handleStartGame}
            className="px-12 py-4 bg-green-800 hover:bg-green-700 border border-green-700 rounded-lg font-semibold text-lg transition-all duration-200 shadow-xl"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  // Playing / Game Over Screen
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
        <div className="relative">
          {gameState.isLoading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
              <div className="text-xl font-bold">Loading...</div>
            </div>
          )}
          <Board
            board={gameState.board}
            legalMoves={gameState.legalMoves}
            onCellClick={handleCellClick}
          />
        </div>

        {/* Game Info */}
        <GameInfo
          currentPlayer={gameState.currentPlayer}
          score={gameState.score}
          gameOver={gameState.gameOver}
          winner={gameState.winner}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

export default App;


