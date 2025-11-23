import { useState, useEffect, useRef } from 'react';
import type { GameState, GameScreen, Position, AIPlayerSettings } from '../types/game';
import { startNewGame, makeMove, makeAIMove, deleteGame } from '../api/gameApi';

const initialGameState: GameState = {
    gameId: null,
    board: Array(8)
        .fill(0)
        .map(() => Array(8).fill(0)),
    currentPlayer: 1,
    score: { black: 0, white: 0 },
    legalMoves: [],
    gameOver: false,
    winner: null,
    isLoading: false,
    aiPlayer: undefined,
};

export const useGameState = () => {
    const [screen, setScreen] = useState<GameScreen>('welcome');
    const [gameState, setGameState] = useState<GameState>(initialGameState);
    const [passedPlayer, setPassedPlayer] = useState<1 | 2 | null>(null);
    const isProcessingAIMove = useRef(false);

    const handleStartGame = async (aiPlayer?: AIPlayerSettings) => {
        setGameState({ ...gameState, isLoading: true });
        setScreen('playing');

        try {
            const response = await startNewGame(
                aiPlayer ? { aiPlayer } : undefined
            );
            setGameState({
                gameId: response.gameId,
                board: response.board,
                currentPlayer: response.currentPlayer,
                score: response.score,
                legalMoves: response.legalMoves,
                gameOver: response.gameOver,
                winner: response.winner || null,
                isLoading: false,
                aiPlayer: aiPlayer,
            });
        } catch (error) {
            console.error('Failed to start game:', error);
            setGameState({ ...gameState, isLoading: false });
            setScreen('welcome');
        }
    };

    const handleCellClick = async (position: Position) => {
        if (gameState.gameOver || gameState.isLoading) return;

        // Check if the move is legal
        const isLegalMove = gameState.legalMoves.some(
            (move) => move.row === position.row && move.col === position.col
        );

        if (!isLegalMove) return;

        setGameState({ ...gameState, isLoading: true });

        try {
            const response = await makeMove({
                gameId: gameState.gameId!,
                position,
            });

            setGameState((prev) => ({
                ...prev,
                board: response.board,
                currentPlayer: response.currentPlayer,
                score: response.score,
                legalMoves: response.legalMoves,
                gameOver: response.gameOver,
                winner: response.winner || null,
                isLoading: false,
            }));

            // Handle pass notification
            if (response.passed) {
                // The player who passed is the opposite of the current player
                // (current player is after the pass, so the other player passed)
                const playerWhoPassed = response.currentPlayer === 1 ? 2 : 1;
                setPassedPlayer(playerWhoPassed);
                // Auto-hide toast after 3 seconds
                setTimeout(() => setPassedPlayer(null), 3000);
            }

            if (response.gameOver) {
                setScreen('gameOver');
            }
        } catch (error) {
            console.error('Failed to make move:', error);
            setGameState({ ...gameState, isLoading: false });
        }
    };

    const handleReset = async () => {
        // Delete game on backend if it exists
        if (gameState.gameId) {
            try {
                await deleteGame(gameState.gameId);
            } catch (error) {
                console.error('Failed to delete game:', error);
                // Continue with reset even if delete fails
            }
        }

        setGameState(initialGameState);
        setScreen('welcome');
        isProcessingAIMove.current = false;
    };

    // Auto AI move effect
    useEffect(() => {
        const shouldMakeAIMove =
            gameState.aiPlayer &&
            gameState.gameId &&
            !gameState.gameOver &&
            !gameState.isLoading &&
            gameState.currentPlayer === gameState.aiPlayer.aiColor &&
            !isProcessingAIMove.current;

        if (!shouldMakeAIMove) return;

        const makeAIMoveAsync = async () => {
            isProcessingAIMove.current = true;
            setGameState((prev) => ({ ...prev, isLoading: true }));

            // Add a small delay to make AI move visible
            await new Promise((resolve) => setTimeout(resolve, 500));

            try {
                const response = await makeAIMove({ gameId: gameState.gameId! });

                setGameState((prev) => ({
                    ...prev,
                    board: response.board,
                    currentPlayer: response.currentPlayer,
                    score: response.score,
                    legalMoves: response.legalMoves,
                    gameOver: response.gameOver,
                    winner: response.winner || null,
                    isLoading: false,
                }));

                // Handle pass notification
                if (response.passed) {
                    const playerWhoPassed = response.currentPlayer === 1 ? 2 : 1;
                    setPassedPlayer(playerWhoPassed);
                    setTimeout(() => setPassedPlayer(null), 3000);
                }

                if (response.gameOver) {
                    setScreen('gameOver');
                }
            } catch (error) {
                console.error('Failed to make AI move:', error);
                setGameState((prev) => ({ ...prev, isLoading: false }));
            } finally {
                isProcessingAIMove.current = false;
            }
        };

        makeAIMoveAsync();
    }, [gameState.currentPlayer, gameState.gameOver, gameState.isLoading, gameState.gameId, gameState.aiPlayer]);

    return {
        screen,
        gameState,
        passedPlayer,
        handleStartGame,
        handleCellClick,
        handleReset,
    };
};
