import fs from "fs";
import path from "path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.ts";

const defaultDatabasePath = "./data/joousda.db";
const configuredDatabaseUrl = process.env.DATABASE_URL?.trim();

function resolveDatabaseUrl() {
  if (!configuredDatabaseUrl) {
    return createFileUrl(defaultDatabasePath);
  }

  const lowerCasedUrl = configuredDatabaseUrl.toLowerCase();
  if (lowerCasedUrl.startsWith("file:") || lowerCasedUrl.startsWith("libsql:")) {
    return configuredDatabaseUrl;
  }

  if (lowerCasedUrl.includes("://")) {
    if (lowerCasedUrl.startsWith("postgresql://") || lowerCasedUrl.startsWith("postgres://")) {
      console.warn("DATABASE_URL uses PostgreSQL, but this app runtime expects SQLite/libSQL. Falling back to local SQLite.");
      return createFileUrl(defaultDatabasePath);
    }

    return configuredDatabaseUrl;
  }

  return createFileUrl(configuredDatabaseUrl);
}

function createFileUrl(databasePath: string) {
  const resolvedPath = path.resolve(process.cwd(), databasePath);
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });

  const normalizedPath = resolvedPath.replace(/\\/g, "/");
  return `file:///${normalizedPath.replace(/^([A-Za-z]:)/, "$1")}`;
}

export const sqlite = createClient({
  url: resolveDatabaseUrl(),
});

export const db = drizzle(sqlite, { schema });
