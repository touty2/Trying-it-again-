/**
 * tRPC request context — standalone version.
 * Reads the JWT session cookie, verifies it, and attaches the user to ctx.
 */
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { verifyToken, AUTH_COOKIE } from "./auth";
import { getUserById } from "../db";
export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};
export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;
  try {
    const req = opts.req;
    const token: string | undefined =
      req.cookies?.[AUTH_COOKIE] ??
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : undefined);
    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        user = (await getUserById(payload.userId)) ?? null;
      }
    }
  } catch {
    user = null;
  }
  return { req: opts.req, res: opts.res, user };
}
