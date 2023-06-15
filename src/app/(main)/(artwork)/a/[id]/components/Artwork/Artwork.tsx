import { Image, comments as commentsTable } from "@/db/schema";
import FeedbackBubble from "./components/FeedbackBubble";
import db from "@/db";
import { eq } from "drizzle-orm";
import FeedbackInput from "./components/FeedbackInput";

type ArtworkProps = {
  image: Image;
};

const Artwork = async ({ image }: ArtworkProps) => {
  const comments = await db.query.comments.findMany({
    where: eq(commentsTable.feedback_image_id, image.id),
  });

  return (
    <div className="relative">
      <FeedbackInput image={image} />
      {comments.map((comment) => (
        <FeedbackBubble key={comment.id} feedback={comment} />
      ))}
      <img
        className="mb-4 w-full md:mb-0 md:max-h-[calc(100vh-4rem)] md:w-auto"
        src={`https://uploadthing.com/f/${image.key}`}
        style={{
          aspectRatio: image.height ? image.width / image.height : 1,
        }}
      />
    </div>
  );
};

export default Artwork;
