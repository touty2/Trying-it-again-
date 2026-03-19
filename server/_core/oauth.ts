/**
 * Standalone auth REST routes (replaces Manus OAuth).
 *
 * POST /api/auth/register  — create account
 * POST /api/auth/login     — sign in, set cookie
 * POST /api/auth/logout    — clear cookie
 * GET  /api/auth/me        — return current user
 */
import type { Express, Request, Response } from "express";
import { getUserByEmail, createUser, updateLastSignedIn, getUserById } from "../db";
import { hashPassword, comparePassword, signToken, verifyToken, AUTH_COOKIE, getCookieOptions } from "./auth";
import { ENV } from "./env";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function registerOAuthRoutes(app: Express): void {
  // ── Register ────────────────────────────────────────────────────────────
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body as { email?: string; password?: string; name?: string };
      if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
      if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email address." });
      if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters." });
      const existing = await getUserByEmail(email);
      if (existing) return res.status(409).json({ error: "An account with this email already exists." });
      const passwordHash = await hashPassword(password);
      const userId = await createUser({ email, passwordHash, name });
      const token = signToken({ userId, email: email.toLowerCase() });
      res.cookie(AUTH_COOKIE, token, getCookieOptions(ENV.isProduction));
      return res.json({ id: userId, email: email.toLowerCase(), name: name ?? null, role: "user" });
    } catch (err) {
      console.error("[Auth] Register error:", err);
      return res.status(500).json({ error: "Registration failed. Please try again." });
    }
  });

  // ── Login ──────────────────────────────────────────────────────────────
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as { email?: string; password?: string };
      if (!email || !password) return res.status(400).json({ error: "Email and password are required." });
      const user = await getUserByEmail(email);
      if (!user) {
        await hashPassword(password); // constant-time
        return res.status(401).json({ error: "Invalid email or password." });
      }
      const valid = await comparePassword(password, user.passwordHash);
      if (!valid) return res.status(401).json({ error: "Invalid email or password." });
      await updateLastSignedIn(user.id);
      const token = signToken({ userId: user.id, email: user.email });
      res.cookie(AUTH_COOKIE, token, getCookieOptions(ENV.isProduction));
      return res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (err) {
      console.error("[Auth] Login error:", err);
      return res.status(500).json({ error: "Login failed. Please try again." });
    }
  });

  // ── Logout ────────────────────────────────────────────────────────────
  app.post("/api/auth/logout", (_req: Request, res: Response) => {
    res.clearCookie(AUTH_COOKIE, getCookieOptions(ENV.isProduction));
    return res.json({ success: true });
  });

  // ── Me ────────────────────────────────────────────────────────────────
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const token: string | undefined =
        req.cookies?.[AUTH_COOKIE] ??
        (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : undefined);
      if (!token) return res.status(401).json({ error: "Not authenticated." });
      const payload = verifyToken(token);
      if (!payload) return res.status(401).json({ error: "Invalid or expired session." });
      const user = await getUserById(payload.userId);
      if (!user) return res.status(401).json({ error: "User not found." });
      return res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (err) {
      console.error("[Auth] Me error:", err);
      return res.status(500).json({ error: "Failed to get user." });
    }
  });
}
