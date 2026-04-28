import { ensureDatabase } from "../src/db/init.ts";

await ensureDatabase();
console.log("Database initialized and seeded.");
