DO $$ BEGIN
 CREATE TYPE "notification_type" AS ENUM('comment');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artworks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"feedback" boolean DEFAULT true NOT NULL,
	"wip" boolean DEFAULT false NOT NULL,
	"thumbnail_image_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"artwork_id" uuid NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_feedback" boolean DEFAULT false NOT NULL,
	"feedback_image_id" integer,
	"feedback_image_x" numeric,
	"feedback_image_y" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"artwork_id" uuid NOT NULL,
	"file_key" varchar(256) NOT NULL,
	"width" integer DEFAULT 0 NOT NULL,
	"height" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"artwork_id" uuid NOT NULL,
	"source_type" "notification_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags_to_artworks" (
	"artwork_id" uuid NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT tags_to_artworks_artwork_id_tag_id PRIMARY KEY("artwork_id","tag_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artworks" ADD CONSTRAINT "artworks_thumbnail_image_id_images_id_fk" FOREIGN KEY ("thumbnail_image_id") REFERENCES "images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags_to_artworks" ADD CONSTRAINT "tags_to_artworks_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags_to_artworks" ADD CONSTRAINT "tags_to_artworks_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
