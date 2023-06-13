ALTER TABLE "images" ADD COLUMN "width" integer DEFAULT 0 NOT NULL;
ALTER TABLE "images" ADD COLUMN "height" integer DEFAULT 0 NOT NULL;
ALTER TABLE "images" ADD COLUMN "is_thumbnail" boolean DEFAULT false NOT NULL;
ALTER TABLE "artworks" DROP COLUMN IF EXISTS "thumbnail_key";