import type {
    GameStateResponse,
    MakeMoveRequest,
} from '../types/game';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!API_BASE_URL) {
    throw new Error('VITE_BACKEND_URL environment variable is not set');
}

export const startNewGame = async (): Promise<GameStateResponse> => {
    const response = await fetch(`${API_BASE_URL}/game/new`, {
        method: 'POST',
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

