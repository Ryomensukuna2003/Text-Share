import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL);

let tablesInitialized = false;

export async function ensureTable() {
  if (tablesInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS Instance (
      id SERIAL PRIMARY KEY,
      data TEXT,
      CHECK (octet_length(data) <= 100000000),
      created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `;
  tablesInitialized = true;
}
