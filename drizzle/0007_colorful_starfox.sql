CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"artwork_id" uuid NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_feedback" boolean DEFAULT false NOT NULL,
	"feedback_image_id" uuid,
	"feedback_image_x" integer DEFAULT 0 NOT NULL,
	"feedback_image_y" integer DEFAULT 0 NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_artwork_id_artworks_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "artworks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_feedback_image_id_images_id_fk" FOREIGN KEY ("feedback_image_id") REFERENCES "images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
