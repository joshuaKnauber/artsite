CREATE TABLE IF NOT EXISTS "artworks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(256),
	"title" varchar(256),
	"description" text,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"artwork_id" uuid,
	"url" varchar(256)
);

DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
