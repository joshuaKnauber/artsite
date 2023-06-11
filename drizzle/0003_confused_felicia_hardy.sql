CREATE TABLE IF NOT EXISTS "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL
);

ALTER TABLE "artworks" ADD COLUMN "feedback" boolean DEFAULT false NOT NULL;