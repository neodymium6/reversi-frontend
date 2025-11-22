import { useState } from 'react';
import type { GameState, GameScreen, Position } from '../types/game';
import { startNewGame, makeMove } from '../api/gameApi';

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
};

export const useGameState = () => {
    const [screen, setScreen] = useState<GameScreen>('welcome');
    const [gameState, setGameState] = useState<GameState>(initialGameState);

    const handleStartGame = async () => {
        setGameState({ ...gameState, isLoading: true });
        setScreen('playing');

        try {
            const response = await startNewGame();
            setGameState({
                gameId: crypto.randomUUID(),
                board: response.board,
                currentPlayer: response.currentPlayer,
                score: response.score,
                legalMoves: response.legalMoves,
                gameOver: response.gameOver,
                winner: response.winner || null,
                isLoading: false,
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

            setGameState({
                ...gameState,
                board: response.board,
                currentPlayer: response.currentPlayer,
                score: response.score,
                legalMoves: response.legalMoves,
                gameOver: response.gameOver,
                winner: response.winner || null,
                isLoading: false,
            });

            if (response.gameOver) {
                setScreen('gameOver');
            }
        } catch (error) {
            console.error('Failed to make move:', error);
            setGameState({ ...gameState, isLoading: false });
        }
    };

    const handleReset = () => {
        setGameState(initialGameState);
        setScreen('welcome');
    };

    return {
        screen,
        gameState,
        handleStartGame,
        handleCellClick,
        handleReset,
    };
};
