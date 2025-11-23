import type {
    GameStateResponse,
    MakeMoveRequest,
    AIPlayerInfo,
    CreateGameRequest,
    AIMoveRequest,
} from '../types/game';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!API_BASE_URL) {
    throw new Error('VITE_BACKEND_URL environment variable is not set');
}

export const getAIPlayers = async (): Promise<AIPlayerInfo[]> => {
    const response = await fetch(`${API_BASE_URL}/ai/players`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch AI players');
    }

    return response.json();
};

export const startNewGame = async (
    request?: CreateGameRequest
): Promise<GameStateResponse> => {
    const response = await fetch(`${API_BASE_URL}/game/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: request ? JSON.stringify(request) : undefined,
    });

    if (!response.ok) {
        throw new Error('Failed to start new game');
    }

    return response.json();
};

export const makeMove = async (
    request: MakeMoveRequest
): Promise<GameStateResponse> => {
    const response = await fetch(`${API_BASE_URL}/game/move`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to make move');
    }

    return response.json();
};

export const makeAIMove = async (
    request: AIMoveRequest
): Promise<GameStateResponse> => {
    const response = await fetch(`${API_BASE_URL}/game/ai-move`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to make AI move');
    }

    return response.json();
};

export const deleteGame = async (gameId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to delete game');
    }
};

