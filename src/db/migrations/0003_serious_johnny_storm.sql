/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'artwork_thumbnails'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "artwork_thumbnails" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "artwork_thumbnails" ADD CONSTRAINT "artwork_thumbnails_artwork_id_thumbnail_image_id" PRIMARY KEY("artwork_id","thumbnail_image_id");