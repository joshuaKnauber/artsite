ALTER TABLE "artworks" ALTER COLUMN "user_id" SET NOT NULL;
ALTER TABLE "artworks" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "artworks" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "artworks" ALTER COLUMN "created_at" SET NOT NULL;
ALTER TABLE "images" ALTER COLUMN "artwork_id" SET NOT NULL;
ALTER TABLE "images" ALTER COLUMN "url" SET NOT NULL;