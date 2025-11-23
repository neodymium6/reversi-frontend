# Reversi Frontend

A modern web-based Reversi (Othello) game built with React, TypeScript, and Vite.

## Features

- Clean, professional UI with green/white/black color scheme
- Fully responsive design for mobile, tablet, and desktop
- Real-time game state updates
- Legal move indicators
- Pass handling with visual notifications
- Score tracking
- Game over detection with winner announcement
- AI opponent support
- Player vs Player and Player vs AI game modes

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **ESLint** - Code quality

## Game Modes

### Player vs Player
Play against another human player on the same device.

### Player vs AI
Play against an AI opponent. Select from available AI players and choose which color the AI plays.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Backend API running (see [reversi-backend](https://github.com/neodymium6/reversi-backend))

## Setup

1. **Clone the repository** (if not already done)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set the backend URL:
   ```env
   VITE_BACKEND_URL=http://localhost:8000/api
   ```

   **Note:** The `VITE_BACKEND_URL` environment variable is **required**. The application will throw an error if it's not set.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/           # API communication layer
│   └── gameApi.ts
├── components/    # React components
│   ├── Board.tsx
│   ├── Cell.tsx
│   ├── Piece.tsx
│   └── GameInfo.tsx
├── hooks/         # Custom React hooks
│   └── useGameState.ts
├── types/         # TypeScript type definitions
│   └── game.ts
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_BACKEND_URL` | Backend API URL | Yes | None |

## Development

The frontend communicates with a separate backend API. Make sure the backend is running before starting the frontend development server.

For backend setup instructions, see the [reversi-backend](https://github.com/neodymium6/reversi-backend) repository.

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Docker

### Quick Start with Docker

Pull the latest image from GitHub Container Registry:

```bash
docker pull ghcr.io/neodymium6/reversi-frontend:latest
```

Run with default backend URL (`http://localhost:8000/api`):

```bash
docker run -d -p 80:80 --name reversi-frontend ghcr.io/neodymium6/reversi-frontend:latest
```

Run with custom backend URL:

```bash
docker run -d -p 80:80 \
  -e VITE_BACKEND_URL=http://your-backend-url/api \
  --name reversi-frontend \
  ghcr.io/neodymium6/reversi-frontend:latest
```

The app will be available at `http://localhost`

### Building Locally

```bash
docker build -t reversi-frontend:latest .
docker run -d -p 80:80 -e VITE_BACKEND_URL=http://localhost:8000/api reversi-frontend:latest
```

### Environment Variables

The backend URL can be configured at **runtime** using the `-e` flag:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API URL | `http://localhost:8000/api` |

**Note:** Unlike traditional Vite apps, this application supports runtime environment configuration in Docker, so you don't need to rebuild the image to change the backend URL.

## License

See LICENSE file for details.
