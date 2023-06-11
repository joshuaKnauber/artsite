import { pgTable, text, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const artworks = pgTable("artworks", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
});

export const artworksRelations = relations(artworks, ({ many }) => ({
  images: many(images),
}));

export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  artwork_id: uuid("artwork_id")
    .references(() => artworks.id)
    .notNull(),
  key: varchar("key", { length: 256 }).notNull(),
});

export const imagesRelations = relations(images, ({ one }) => ({
  artwork: one(artworks, {
    fields: [images.artwork_id],
    references: [artworks.id],
  }),
}));
