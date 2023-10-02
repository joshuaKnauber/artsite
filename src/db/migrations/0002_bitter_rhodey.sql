CREATE TABLE IF NOT EXISTS "artwork_thumbnails" (
	"artwork_id" uuid PRIMARY KEY NOT NULL,
	"thumbnail_image_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "artworks" DROP CONSTRAINT "artworks_thumbnail_image_id_images_id_fk";
--> statement-breakpoint
ALTER TABLE "artworks" DROP COLUMN IF EXISTS "thumbnail_image_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artwork_thumbnails" ADD CONSTRAINT "artwork_thumbnails_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artwork_thumbnails" ADD CONSTRAINT "artwork_thumbnails_thumbnail_image_id_images_id_fk" FOREIGN KEY ("thumbnail_image_id") REFERENCES "images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
