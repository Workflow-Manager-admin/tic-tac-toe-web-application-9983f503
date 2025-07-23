import { useState } from "react";
import { createGame, joinGame } from "../services/ticTacToeService";
import type { Game } from "../types/ticTacToe";

export function useCreateGame(authToken: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);

  // PUBLIC_INTERFACE
  async function handleCreateGame(): Promise<void> {
    /** Creates a new game, stores result/error in state. */
    setIsLoading(true);
    setError(null);
    try {
      const data: Game = await createGame(authToken);
      setGame(data);
    } catch (e) {
      setError((e as { message?: string })?.message ?? "Game creation failed");
    } finally {
      setIsLoading(false);
    }
  }

  return { game, error, isLoading, createGame: handleCreateGame };
}

export function useJoinGame(authToken: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);

  // PUBLIC_INTERFACE
  async function handleJoinGame(gameId: string): Promise<void> {
    /** Joins an existing game, stores result/error in state. */
    setIsLoading(true);
    setError(null);
    try {
      const data: Game = await joinGame(gameId, authToken);
      setGame(data);
    } catch (e) {
      setError((e as { message?: string })?.message ?? "Join failed");
    } finally {
      setIsLoading(false);
    }
  }

  return { game, error, isLoading, joinGame: handleJoinGame };
}
