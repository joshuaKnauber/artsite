import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as schema from "./schema";

const connection = connect({
  url: process.env.DATABASE_URL,
});

const db = drizzle(connection, { schema });

export default db;
