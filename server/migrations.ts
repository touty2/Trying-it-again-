/**
 * Startup migration runner.
 *
 * Each migration is idempotent — safe to run on every boot.
 * Migrations are applied in order and logged to the console.
 * If the DB is unavailable the runner logs a warning and continues
 * so the server can still start in degraded mode.
 */
import { getDb } from "./db";
import { sql } from "drizzle-orm";

interface Migration {
  id: string;
  up: string;
}

/**
 * All migrations must be idempotent (IF NOT EXISTS / safe ALTERs).
 * Append new migrations at the bottom — never reorder or delete.
 */
const MIGRATIONS: Migration[] = [
  {
    id: "0002_add_isleech_column",
    up: `ALTER TABLE \`sync_flashcards\`
         ADD COLUMN IF NOT EXISTS \`isLeech\` boolean NOT NULL DEFAULT false`,
  },
  {
    id: "0002_add_idx_user_due",
    up: `CREATE INDEX IF NOT EXISTS \`idx_sync_flashcards_user_due\`
         ON \`sync_flashcards\` (\`userId\`, \`dueDate\`)`,
  },
  {
    id: "0002_add_idx_user_reviewed",
    up: `CREATE INDEX IF NOT EXISTS \`idx_sync_flashcards_user_reviewed\`
         ON \`sync_flashcards\` (\`userId\`, \`lastReviewed\`)`,
  },
];

export async function runStartupMigrations(): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Migrations] DB not available — skipping startup migrations");
    return;
  }

  for (const migration of MIGRATIONS) {
    try {
      await db.execute(sql.raw(migration.up));
      console.log(`[Migrations] ✓ ${migration.id}`);
    } catch (err: unknown) {
      // Ignore "Duplicate key name" errors — the index already exists
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.includes("Duplicate key name") ||
        msg.includes("already exists") ||
        msg.includes("Duplicate column name")
      ) {
        console.log(`[Migrations] ✓ ${migration.id} (already applied)`);
      } else {
        console.error(`[Migrations] ✗ ${migration.id}:`, msg);
        // Don't throw — let the server start even if a migration fails
      }
    }
  }
}
