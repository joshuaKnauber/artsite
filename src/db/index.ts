import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_CONNECTION_STRING || "");
const db = drizzle(client);

export default db;
