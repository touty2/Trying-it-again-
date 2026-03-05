/**
 * Standalone email/password authentication.
 *
 * Replaces Manus OAuth. Provides:
 *   - registerUser   — create account with email + password
 *   - loginUser      — verify credentials, return signed JWT
 *   - verifyToken    — validate JWT and return user id
 *   - hashPassword   — bcrypt hash helper
 *   - comparePassword — bcrypt compare helper
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "./env";

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = "30d"; // 30-day sessions

// ─── Password Helpers ─────────────────────────────────────────────────────────

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ─── JWT Helpers ──────────────────────────────────────────────────────────────

export interface JwtPayload {
  userId: number;
  email: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, ENV.jwtSecret, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, ENV.jwtSecret) as JwtPayload & { iat: number; exp: number };
    return { userId: decoded.userId, email: decoded.email };
  } catch {
    return null;
  }
}

// ─── Cookie Name ──────────────────────────────────────────────────────────────

export const AUTH_COOKIE = "app_session";

export function getCookieOptions(isProduction: boolean) {
  // On Render, the frontend and backend share the same origin
  // (e.g. https://myapp.onrender.com), so SameSite=Lax works perfectly.
  // SameSite=None requires the cookie to be cross-site, which is not needed here
  // and causes issues with some browsers and proxy configurations.
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  };
}
