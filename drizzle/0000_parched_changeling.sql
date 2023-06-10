CREATE TABLE IF NOT EXISTS "artworks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(256),
	"title" varchar(256),
	"description" text,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"artwork_id" serial NOT NULL,
	"url" varchar(256)
);

CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"artwork_id" serial NOT NULL,
	"tag" varchar(256)
);

DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tags" ADD CONSTRAINT "tags_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
