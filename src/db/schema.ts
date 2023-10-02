import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  serial,
  integer,
  decimal,
  uuid,
  AnyPgColumn,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { InferModel, relations, sql } from "drizzle-orm";

export const artworks = pgTable("artworks", {
  id: uuid("id").primaryKey().notNull().default(sql`gen_random_uuid()`),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  feedback: boolean("feedback").notNull().default(true),
  wip: boolean("wip").notNull().default(false),
  created_at: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
});

export const images = pgTable(
  "images",
  {
    id: serial("id").primaryKey().notNull(),
    artwork_id: uuid("artwork_id").notNull().references((): AnyPgColumn => artworks.id),
    file_key: varchar("file_key", { length: 256 }).notNull(),
    width: integer("width").notNull().default(0),
    height: integer("height").notNull().default(0),
  }
);

export const artworkThumbnails = pgTable(
  "artwork_thumbnails",
  {
    artwork_id: uuid("artwork_id").notNull().references(() => artworks.id),
    thumbnail_image_id: integer("thumbnail_image_id").notNull().references(() => images.id),
  }, (table) => {
    return {
      pk: primaryKey(table.artwork_id, table.thumbnail_image_id),
    };
  }
);

export const artworksRelations = relations(artworks, ({ many, one }) => ({
  images: many(images),
  tagsToArtworks: many(tagsToArtworks),
  thumbnail: one(artworkThumbnails, {
    fields: [artworks.id],
    references: [artworkThumbnails.artwork_id],
  }),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  artwork: one(artworks, {
    fields: [images.artwork_id],
    references: [artworks.id],
  }),
  artworkThumbnails: one(artworkThumbnails, {
    fields: [images.id],
    references: [artworkThumbnails.thumbnail_image_id],
  }),
}));

export const artworkThumbnailsRelations = relations(artworkThumbnails, ({ one }) => ({
  artwork: one(artworks, {
    fields: [artworkThumbnails.artwork_id],
    references: [artworks.id],
  }),
  thumbnailImage: one(images, {
    fields: [artworkThumbnails.thumbnail_image_id],
    references: [images.id],
  }),
}));

export const tags = pgTable("tags", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull().unique(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  tagsToArtworks: many(tagsToArtworks),
}));

export const tagsToArtworks = pgTable(
  "tags_to_artworks",
  {
    artwork_id: uuid("artwork_id")
      .notNull()
      .references(() => artworks.id),
    tag_id: integer("tag_id")
      .notNull()
      .references(() => tags.id),
  }, (table) => {
    return {
      pk: primaryKey(table.artwork_id, table.tag_id),
    };
  }
);

export const tagsToArtworksRelations = relations(tagsToArtworks, ({ one }) => ({
  artwork: one(artworks, {
    fields: [tagsToArtworks.artwork_id],
    references: [artworks.id],
  }),
  tag: one(tags, {
    fields: [tagsToArtworks.tag_id],
    references: [tags.id],
  }),
}));

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey().notNull(),
    artwork_id: uuid("artwork_id").notNull().references(() => artworks.id),
    user_id: varchar("user_id", { length: 256 }).notNull(),
    text: text("text").notNull(),
    created_at: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    is_feedback: boolean("is_feedback").notNull().default(false),
    feedback_image_id: integer("feedback_image_id"),
    feedback_image_x: decimal("feedback_image_x"),
    feedback_image_y: decimal("feedback_image_y"),
  }
);

export const notificationTypeEnum = pgEnum('notification_type', ['comment']);

export const notifications = pgTable(
  "notifications",
  {
    id: serial("id").primaryKey().notNull(),
    user_id: varchar("user_id", { length: 256 }).notNull(),
    comment_id: serial("comment_id").references(() => comments.id),
    source_type: notificationTypeEnum("source_type").notNull(),
    created_at: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    is_read: boolean("is_read").notNull().default(false),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  comment: one(comments, {
    fields: [notifications.comment_id],
    references: [comments.id],
  }),
}));

export type Artwork = typeof artworks.$inferSelect;
export type Image = typeof images.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type Notification = typeof notifications.$inferSelect & {
  source_type: "comment";
};
