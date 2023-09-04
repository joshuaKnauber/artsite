CREATE TABLE IF NOT EXISTS "artworks" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"feedback" boolean DEFAULT true NOT NULL,
	"wip" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"artwork_id" integer NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_feedback" boolean DEFAULT false NOT NULL,
	"feedback_image_id" integer,
	"feedback_image_x" numeric,
	"feedback_image_y" numeric
);

CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"artwork_id" integer NOT NULL,
	"key" varchar(256) NOT NULL,
	"width" integer DEFAULT 0 NOT NULL,
	"height" integer DEFAULT 0 NOT NULL,
	"is_thumbnail" boolean DEFAULT false NOT NULL
);

CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"source_id" integer NOT NULL,
	"source_type" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL
);

CREATE INDEX IF NOT EXISTS "artwork_idx" ON "comments" ("artwork_id");
CREATE INDEX IF NOT EXISTS "artwork_idx" ON "images" ("artwork_id");
CREATE INDEX IF NOT EXISTS "user_idx" ON "notifications" ("user_id");