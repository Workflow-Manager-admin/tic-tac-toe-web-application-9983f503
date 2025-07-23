import { useState, useEffect } from "react";
import { listActiveGames, listGameHistory } from "../services/ticTacToeService";
import type { GameSummary } from "../types/ticTacToe";

// PUBLIC_INTERFACE
export function useGamesList(authToken: string) {
  /** Loads a list of available active games to join. */
  const [games, setGames] = useState<GameSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authToken) return;
    setIsLoading(true);
    listActiveGames(authToken)
      .then((data: GameSummary[]) => setGames(data))
      .catch((e) => setError((e as { message?: string })?.message ?? "Error loading games"))
      .finally(() => setIsLoading(false));
  }, [authToken]);

  return { games, error, isLoading };
}

// PUBLIC_INTERFACE
export function useGameHistory(authToken: string) {
  /** Loads a list of finished games for the current user. */
  const [games, setGames] = useState<GameSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authToken) return;
    setIsLoading(true);
    listGameHistory(authToken)
      .then((data: GameSummary[]) => setGames(data))
      .catch((e) => setError((e as { message?: string })?.message ?? "Error loading history"))
      .finally(() => setIsLoading(false));
  }, [authToken]);

  return { games, error, isLoading };
}
