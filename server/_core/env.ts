/**
 * Centralised environment variable access.
 * Combines standalone email/password auth vars with Manus platform vars
 * needed by the scaffold _core helpers (llm, notification, storage, etc.).
 */
export const ENV = {
  /** MySQL / TiDB connection string */
  databaseUrl: process.env.DATABASE_URL ?? "",
  /** Secret used to sign JWT session tokens */
  jwtSecret: process.env.JWT_SECRET ?? "change-me-in-production",
  /** Node environment */
  isProduction: process.env.NODE_ENV === "production",
  /** Port override */
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,

  // ── Manus platform vars (used by _core helpers) ──────────────────────────
  /** Manus built-in API base URL (server-side) */
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  /** Manus built-in API key (server-side) */
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  /** Manus OAuth server URL */
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  /** Manus OAuth app ID */
  appId: process.env.VITE_APP_ID ?? "",
  /** Cookie signing secret (alias for jwtSecret) */
  cookieSecret: process.env.JWT_SECRET ?? "change-me-in-production",
  /** Owner's Manus open ID */
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  /** Owner's name */
  ownerName: process.env.OWNER_NAME ?? "",
};
