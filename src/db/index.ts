import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error("DATABASE_URL is required for the production database connection.");
}

const globalForDatabase = globalThis as typeof globalThis & {
  joousdaPool?: InstanceType<typeof Pool>;
};

const pool =
  globalForDatabase.joousdaPool ??
  new Pool({
    connectionString,
    ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.joousdaPool = pool;
}

export const db = drizzle(pool, { schema });
