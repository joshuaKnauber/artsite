import { Client as NeonClient } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

const neonClient = new NeonClient(process.env.DATABASE_URL);
neonClient.connect();
const db = drizzle(neonClient, { schema });

export default db;
