import { apiFetch } from "./api";

// ========== Authentication ==========
// PUBLIC_INTERFACE
export async function register(username: string, password: string) {
  /** Register a new user, returns auth token or error. */
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

// PUBLIC_INTERFACE
export async function login(username: string, password: string) {
  /** Log in user, returns auth token or error. */
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

// ========== Game Actions ==========
// PUBLIC_INTERFACE
export async function createGame(authToken: string) {
  /** Creates a new game, returns game details. */
  return apiFetch("/games", {
    method: "POST",
  }, authToken);
}

// PUBLIC_INTERFACE
export async function joinGame(gameId: string, authToken: string) {
  /** Join an existing game, returns game details. */
  return apiFetch(`/games/${gameId}/join`, {
    method: "POST",
  }, authToken);
}

// PUBLIC_INTERFACE
export async function makeMove(
  gameId: string,
  position: number,
  authToken: string
) {
  /** Make a move in a game, returns updated game state. */
  return apiFetch(`/games/${gameId}/move`, {
    method: "POST",
    body: JSON.stringify({ position }),
  }, authToken);
}

// PUBLIC_INTERFACE
export async function getGameState(gameId: string, authToken: string) {
  /** Gets current state of a game. */
  return apiFetch(`/games/${gameId}`, {
    method: "GET",
  }, authToken);
}

// PUBLIC_INTERFACE
export async function listActiveGames(authToken: string) {
  /** List available games that can be joined. */
  return apiFetch("/games", {
    method: "GET",
  }, authToken);
}

// PUBLIC_INTERFACE
export async function listGameHistory(authToken: string) {
  /** List finished or past games for the user. */
  return apiFetch("/games/history", {
    method: "GET",
  }, authToken);
}
