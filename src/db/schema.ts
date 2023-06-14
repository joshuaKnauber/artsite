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
  comments: many(comments),
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

export const imagesRelations = relations(images, ({ one, many }) => ({
  artwork: one(artworks, {
    fields: [images.artwork_id],
    references: [artworks.id],
  }),
  comments: many(comments),
}));

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  artwork_id: uuid("artwork_id")
    .references(() => artworks.id)
    .notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  text: text("text").notNull(),
  created_at: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
  is_feedback: boolean("is_feedback").notNull().default(false),
  feedback_image_id: uuid("feedback_image_id").references(
    () => images.id
  ),
  feedback_image_x: integer("feedback_image_x").notNull().default(0),
  feedback_image_y: integer("feedback_image_y").notNull().default(0),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  artwork: one(artworks, {
    fields: [comments.artwork_id],
    references: [artworks.id],
  }),
  feedback_image: one(images, {
    fields: [comments.feedback_image_id],
    references: [images.id],
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
