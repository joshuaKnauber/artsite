import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const artworks = pgTable("artworks", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }),
  title: varchar("title", { length: 256 }),
  description: text("description"),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  artwork_id: serial("artwork_id").references(() => artworks.id),
  url: varchar("url", { length: 256 }),
});
