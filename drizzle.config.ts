import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  connectionString: process.env.DATABASE_CONNECTION_STRING || "",
} satisfies Config;
