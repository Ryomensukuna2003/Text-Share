import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  ssl:
    process.env.NODE_ENV === "production" || process.env.PGSSL === "true"
      ? { rejectUnauthorized: false }
      : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
