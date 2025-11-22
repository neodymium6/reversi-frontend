/**
 * Player representation
 * 1 = Black, 2 = White
 */
export type Player = 1 | 2;

/**
 * Cell state in the board
 * 0 = Empty, 1 = Black, 2 = White
 */
export type CellState = 0 | 1 | 2;

/**
 * Position on the board (0-indexed)
 */
export interface Position {
    row: number;
    col: number;
}

/**
 * Board state (8x8 grid)
 */
export type BoardState = CellState[][];

/**
 * Score for both players
 */
export interface Score {
    black: number;
    white: number;
}

/**
 * Complete game state
 */
export interface GameState {
    gameId: string | null;
    board: BoardState;
    currentPlayer: Player;
    score: Score;
    legalMoves: Position[];
    gameOver: boolean;
    winner: Player | null;
    isLoading: boolean;
}

/**
 * Game screen state
 */
export type GameScreen = 'welcome' | 'playing' | 'gameOver';

/**
 * API Response for game state
 */
export interface GameStateResponse {
    board: BoardState;
    currentPlayer: Player;
    score: Score;
    legalMoves: Position[];
    gameOver: boolean;
    winner?: Player | null;
}

/**
 * API Request to make a move
 */
export interface MakeMoveRequest {
    gameId: string;
    position: Position;
    thinkingTime?: number;
}
