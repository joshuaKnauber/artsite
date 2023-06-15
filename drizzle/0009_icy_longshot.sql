ALTER TABLE "comments" ALTER COLUMN "feedback_image_x" DROP DEFAULT;
ALTER TABLE "comments" ALTER COLUMN "feedback_image_x" DROP NOT NULL;
ALTER TABLE "comments" ALTER COLUMN "feedback_image_y" DROP DEFAULT;
ALTER TABLE "comments" ALTER COLUMN "feedback_image_y" DROP NOT NULL;