/**
 * useAuth — standalone email/password authentication hook.
 *
 * Calls the REST endpoints registered in server/_core/oauth.ts:
 *   GET  /api/auth/me       → get current user
 *   POST /api/auth/login    → sign in
 *   POST /api/auth/register → create account
 *   POST /api/auth/logout   → sign out
 *
 * The server sets/clears an HTTP-only cookie; the client never touches tokens.
 */

import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  role: "user" | "admin";
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...options.headers },
    });
    const json = await res.json();
    if (!res.ok) return { data: null, error: json.error ?? "Request failed." };
    return { data: json as T, error: null };
  } catch {
    return { data: null, error: "Network error. Please check your connection." };
  }
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { data, error } = await apiFetch<AuthUser>("/api/auth/me");
    setState({
      user: data,
      loading: false,
      error,
      isAuthenticated: !!data,
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      setState((s) => ({ ...s, loading: true, error: null }));
      const { data, error } = await apiFetch<AuthUser>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setState({ user: data, loading: false, error, isAuthenticated: !!data });
      return error;
    },
    []
  );

  const register = useCallback(
    async (email: string, password: string, name?: string): Promise<string | null> => {
      setState((s) => ({ ...s, loading: true, error: null }));
      const { data, error } = await apiFetch<AuthUser>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      });
      setState({ user: data, loading: false, error, isAuthenticated: !!data });
      return error;
    },
    []
  );

  const logout = useCallback(async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    setState({ user: null, loading: false, error: null, isAuthenticated: false });
  }, []);

  return { ...state, login, register, logout, refresh };
}
