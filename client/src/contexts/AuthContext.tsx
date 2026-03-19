/**
 * AuthContext — thin wrapper that provides <AuthProvider> for App.tsx.
 *
 * Real authentication is handled entirely by Manus OAuth:
 *   - Server: server/_core/oauth.ts (callback, session cookie)
 *   - Client: client/src/_core/hooks/useAuth.ts (trpc.auth.me)
 *
 * This file exists only to export <AuthProvider> so App.tsx can wrap the tree.
 * All components should import useAuth from "@/_core/hooks/useAuth", not here.
 */

import type { ReactNode } from "react";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  // No state needed here — auth state lives in trpc.auth.me (useAuth hook).
  return <>{children}</>;
}
