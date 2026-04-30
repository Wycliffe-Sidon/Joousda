import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    db: {
      provider: "postgresql",
      url: "postgresql://neondb_owner:npg_lL6bUfpduv8e@ep-damp-boat-anu72aab.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require",
    },
  },
});
