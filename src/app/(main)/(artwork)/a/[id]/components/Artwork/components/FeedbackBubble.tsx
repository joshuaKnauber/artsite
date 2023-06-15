import { Comment } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";

type FeedbackBubbleProps = {
  feedback: Comment;
};

const FeedbackBubble = async ({ feedback }: FeedbackBubbleProps) => {
  const user = await clerkClient.users.getUser(feedback.user_id);

  return (
    <div
      key={feedback.id}
      className="absolute flex origin-bottom-left flex-row items-center gap-2 rounded-full rounded-bl-sm bg-white p-1 shadow-md"
      style={{
        left: `${feedback.feedback_image_x}%`,
        top: `${feedback.feedback_image_y}%`,
        transform: "translateY(-100%)",
      }}
    >
      <img
        src={user.profileImageUrl}
        className="h-6 w-6 flex-shrink-0 rounded-full"
      />
      <span className="text-xs text-black">{feedback.text}</span>
    </div>
  );
};

export default FeedbackBubble;
