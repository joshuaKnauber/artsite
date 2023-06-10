// run with npm run migrate

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_CONNECTION_STRING || "");
const db = drizzle(client);

const main = async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migration complete");
};

main();
