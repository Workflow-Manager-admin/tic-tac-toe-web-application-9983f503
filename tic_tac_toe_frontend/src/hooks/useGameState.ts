import { useEffect, useState, useRef } from "react";
import { getGameState } from "../services/ticTacToeService";
import type { Game } from "../types/ticTacToe";

// PUBLIC_INTERFACE
export function useGameState(
  gameId: string,
  authToken: string,
  pollInterval = 2000
) {
  /**
   * Returns latest game state and an error/message.
   * Polls every `pollInterval` ms for changes.
   */
  const [gameState, setGameState] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!gameId || !authToken) return;

    let cancelled = false;

    async function fetchGameState() {
      try {
        const data: Game = await getGameState(gameId, authToken);
        if (!cancelled) {
          setGameState(data);
        }
      } catch (e) {
        if (!cancelled)
          setError((e as { message?: string })?.message ?? "Failed to fetch game state");
      }
    }

    fetchGameState();
    intervalRef.current = setInterval(fetchGameState, pollInterval);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameId, authToken, pollInterval]);

  return { gameState, error };
}
