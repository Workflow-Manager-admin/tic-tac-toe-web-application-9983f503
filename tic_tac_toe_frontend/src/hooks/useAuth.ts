import { useState } from "react";
import { login, register } from "../services/ticTacToeService";
import type { AuthResult } from "../types/ticTacToe";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  // PUBLIC_INTERFACE
  async function loginUser(
    username: string,
    password: string
  ): Promise<AuthResult> {
    /** Authenticates and returns JWT token, or error. */
    setIsLoading(true);
    try {
      const data = await login(username, password);
      setIsLoading(false);
      return { token: data.token };
    } catch (e) {
      setIsLoading(false);
      return { error: (e as { message?: string })?.message ?? "Login failed" };
    }
  }

  // PUBLIC_INTERFACE
  async function registerUser(
    username: string,
    password: string
  ): Promise<AuthResult> {
    /** Registers and returns JWT token, or error. */
    setIsLoading(true);
    try {
      const data = await register(username, password);
      setIsLoading(false);
      return { token: data.token };
    } catch (e) {
      setIsLoading(false);
      return { error: (e as { message?: string })?.message ?? "Registration failed" };
    }
  }

  return { loginUser, registerUser, isLoading };
}
