//
// TypeScript interfaces for API responses/entities.
//

// Auth
export interface AuthResult {
  token?: string;
  error?: string;
}

// Game Board Cell: 0-8 (positions), value = null | "X" | "O"
export type BoardCell = "X" | "O" | null;

// Game status enum
export type GameStatus = "waiting" | "active" | "finished";

// Player
export interface PlayerInfo {
  user_id: string;
  username: string;
  symbol: "X" | "O";
}

// Single Game (active or history)
export interface Game {
  id: string;
  players: PlayerInfo[];
  board: BoardCell[];
  current_turn: "X" | "O";
  status: GameStatus;
  winner?: "X" | "O" | null;
  created_at: string;
  updated_at?: string;
}

// Move result (after making a move)
export interface MoveResult {
  board: BoardCell[];
  current_turn: "X" | "O";
  status: GameStatus;
  winner: "X" | "O" | null;
}

// For game lists
export interface GameSummary {
  id: string;
  status: GameStatus;
  players: PlayerInfo[];
  winner?: "X" | "O" | null;
  created_at: string;
  updated_at?: string;
}
