import {
  mysqlTable,
  text,
  varchar,
  timestamp,
  boolean,
  int,
  decimal,
  index,
} from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";

export const artworks = mysqlTable("artworks", {
  id: int("id").primaryKey().autoincrement(),
  key: varchar("key", { length: 256 }).notNull(),
  user_id: varchar("user_id", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  feedback: boolean("feedback").notNull().default(true),
  wip: boolean("wip").notNull().default(false),
  created_at: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
});

export const images = mysqlTable(
  "images",
  {
    id: int("id").primaryKey().autoincrement(),
    artwork_id: int("artwork_id").notNull(),
    key: varchar("key", { length: 256 }).notNull(),
    width: int("width").notNull().default(0),
    height: int("height").notNull().default(0),
    is_thumbnail: boolean("is_thumbnail").notNull().default(false),
  },
  (table) => {
    return {
      artworkIdx: index("artwork_idx").on(table.artwork_id),
    };
  }
);

export const comments = mysqlTable(
  "comments",
  {
    id: int("id").primaryKey().autoincrement(),
    artwork_id: int("artwork_id").notNull(),
    user_id: varchar("user_id", { length: 256 }).notNull(),
    text: text("text").notNull(),
    created_at: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    is_feedback: boolean("is_feedback").notNull().default(false),
    feedback_image_id: int("feedback_image_id"),
    feedback_image_x: decimal("feedback_image_x"),
    feedback_image_y: decimal("feedback_image_y"),
  },
  (table) => ({
    artworkIdx: index("artwork_idx").on(table.artwork_id),
  })
);

export const notifications = mysqlTable(
  "notifications",
  {
    id: int("id").primaryKey().autoincrement(),
    user_id: varchar("user_id", { length: 256 }).notNull(),
    source_id: int("source_id").notNull(),
    source_type: varchar("source_type", { length: 256 }).notNull(),
    created_at: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    is_read: boolean("is_read").notNull().default(false),
  },
  (table) => ({
    userIdx: index("user_idx").on(table.user_id),
  })
);

export type Artwork = InferModel<typeof artworks>;
export type Image = InferModel<typeof images>;
export type Comment = InferModel<typeof comments>;
export type Notification = InferModel<typeof notifications> & {
  source_type: "comment";
};
