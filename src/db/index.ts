import fs from "fs";
import path from "path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.ts";

const databasePath = process.env.DATABASE_URL ?? "./data/joousda.db";
const resolvedPath = path.resolve(process.cwd(), databasePath);

fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });

const normalizedPath = resolvedPath.replace(/\\/g, "/");
const fileUrl = `file:///${normalizedPath.replace(/^([A-Za-z]:)/, "$1")}`;

export const sqlite = createClient({
  url: fileUrl,
});

export const db = drizzle(sqlite, { schema });
