import { useState } from "react";
import { makeMove } from "../services/ticTacToeService";
import type { MoveResult } from "../types/ticTacToe";

// PUBLIC_INTERFACE
export function useMakeMove(authToken: string) {
  /** Returns function to make a move in a game, with state. */
  const [isLoading, setIsLoading] = useState(false);
  const [moveResult, setMoveResult] = useState<MoveResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleMakeMove(gameId: string, position: number): Promise<void> {
    setIsLoading(true);
    setError(null);
    try {
      const data: MoveResult = await makeMove(gameId, position, authToken);
      setMoveResult(data);
    } catch (e) {
      setError((e as { message?: string })?.message ?? "Move failed");
    } finally {
      setIsLoading(false);
    }
  }

  return { makeMove: handleMakeMove, moveResult, error, isLoading };
}
