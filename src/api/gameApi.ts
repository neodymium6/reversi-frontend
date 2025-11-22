import type {
    BoardState,
    Position,
    GameStateResponse,
    MakeMoveRequest,
} from '../types/game';

/**
 * Stub API utilities for development
 * These will be replaced with actual API calls later
 */

// Initial board setup for Reversi
const getInitialBoard = (): BoardState => {
    const board: BoardState = Array(8)
        .fill(0)
        .map(() => Array(8).fill(0));

    // Set up initial 4 pieces in the center
    board[3][3] = 2; // White
    board[3][4] = 1; // Black
    board[4][3] = 1; // Black
    board[4][4] = 2; // White

    return board;
};

// Stub: Get initial legal moves for black player
const getInitialLegalMoves = (): Position[] => {
    return [
        { row: 2, col: 3 },
        { row: 3, col: 2 },
        { row: 4, col: 5 },
        { row: 5, col: 4 },
    ];
};

/**
 * Stub: Start a new game
 */
export const startNewGame = async (): Promise<GameStateResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
        board: getInitialBoard(),
        currentPlayer: 1, // Black starts
        score: { black: 2, white: 2 },
        legalMoves: getInitialLegalMoves(),
        gameOver: false,
        winner: null,
    };
};

/**
 * Stub: Make a move
 * For now, just returns a mock response
 */
export const makeMove = async (
    request: MakeMoveRequest
): Promise<GameStateResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: This is a stub - replace with actual API call
    // For now, return the same board but switch player
    return {
        board: getInitialBoard(),
        currentPlayer: request.position ? 2 : 1, // Dummy logic
        score: { black: 2, white: 2 },
        legalMoves: getInitialLegalMoves(),
        gameOver: false,
        winner: null,
    };
};
