import { pgTable, text, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const artworks = pgTable("artworks", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: varchar("user_id", { length: 256 }),
  title: varchar("title", { length: 256 }),
  description: text("description"),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  artwork_id: uuid("artwork_id").references(() => artworks.id),
  url: varchar("url", { length: 256 }),
});
