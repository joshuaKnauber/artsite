ALTER TABLE "artworks" ALTER COLUMN "thumbnail_image_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "comment_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" DROP COLUMN IF EXISTS "artwork_id";