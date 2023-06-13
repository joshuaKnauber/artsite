import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  boolean,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, InferModel } from "drizzle-orm";

export const artworks = pgTable("artworks", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  feedback: boolean("feedback").notNull().default(true),
  created_at: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
});

export const artworksRelations = relations(artworks, ({ many }) => ({
  images: many(images),
  tags: many(tags),
}));

export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  artwork_id: uuid("artwork_id")
    .references(() => artworks.id)
    .notNull(),
  key: varchar("key", { length: 256 }).notNull(),
  width: integer("width").notNull().default(0),
  height: integer("height").notNull().default(0),
  is_thumbnail: boolean("is_thumbnail").notNull().default(false),
});

export const imagesRelations = relations(images, ({ one }) => ({
  artwork: one(artworks, {
    fields: [images.artwork_id],
    references: [artworks.id],
  }),
}));

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  artworks: many(artworks),
}));

export type Artwork = InferModel<typeof artworks>;
export type ArtworkWithRelations = InferModel<typeof artworks> & {
  images: Image[];
  tags: Tag[];
};
export type Image = InferModel<typeof images>;
export type Tag = InferModel<typeof tags>;
