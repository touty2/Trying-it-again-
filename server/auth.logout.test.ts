/**
 * Tests for standalone email/password auth — logout and session cookie clearing.
 */
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { AUTH_COOKIE } from "./_core/auth";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

  const user: AuthenticatedUser = {
    id: 1,
    email: "test@example.com",
    name: "Test User",
    role: "user",
    passwordHash: "$2b$12$placeholder",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
      cookies: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as unknown as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
}

describe("auth.logout (standalone)", () => {
  it("clears the session cookie and reports success", async () => {
    const { ctx, clearedCookies } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(AUTH_COOKIE);
    expect(clearedCookies[0]?.options).toMatchObject({
      httpOnly: true,
      path: "/",
    });
  });

  it("returns null for auth.me when no user in context", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "http", headers: {}, cookies: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user).toBeNull();
  });

  it("returns user for auth.me when user is in context", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user).not.toBeNull();
    expect(user?.email).toBe("test@example.com");
    expect(user?.role).toBe("user");
  });
});
