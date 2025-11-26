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
    aiPlayer?: AIPlayerSettings;
}

/**
 * Game screen state
 */
export type GameScreen = 'welcome' | 'playing' | 'gameOver';

/**
 * API Response for game state
 */
export interface GameStateResponse {
    gameId: string;
    board: BoardState;
    currentPlayer: Player;
    score: Score;
    legalMoves: Position[];
    gameOver: boolean;
    winner?: Player | null;
    passed?: boolean;
}

/**
 * API Request to make a move
 */
export interface MakeMoveRequest {
    gameId: string;
    position: Position;
    thinkingTime?: number;
}

/**
 * AI Player information
 */
export interface AIPlayerInfo {
    id: string;
    name: string;
    description: string;
    statistics: AIStatistics;
}

/**
 * AI Player settings for game creation
 */
export interface AIPlayerSettings {
    aiPlayerId: string;
    aiColor: Player;
}

/**
 * Request to create a new game (with optional AI)
 */
export interface CreateGameRequest {
    aiPlayer?: AIPlayerSettings;
}

/**
 * Request for AI to make a move
 */
export interface AIMoveRequest {
    gameId: string;
}

/**
 * Statistics returned for each AI player
 */
export interface AIStatistics {
    totalGames: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number | null;
    asBlackWinRate: number | null;
    asWhiteWinRate: number | null;
    averageScore: number | null;
}
