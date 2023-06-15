"use client";

import { CommentWithAuthor } from "../../hooks/useComments";

type FeedbackBubbleProps = {
  feedback: CommentWithAuthor;
};

const FeedbackBubble = ({ feedback }: FeedbackBubbleProps) => {
  const { comment, author } = feedback;

  if (!author) return null;

  return (
    <div
      key={comment.id}
      className="scale-in group/bubble absolute flex origin-bottom-left scale-0 flex-row items-start justify-end rounded-[1rem] rounded-bl-sm bg-white p-0.5 shadow-md hover:z-10 hover:p-1"
      style={{
        left: `${comment.feedback_image_x}%`,
        bottom: `calc(100% - ${comment.feedback_image_y}%)`,
      }}
    >
      <img
        src={author.profileImageUrl}
        className="h-5 w-5 flex-shrink-0 rounded-full transition-all group-hover/bubble:mt-0.5"
      />
      <div className="mx-0 my-0 grid grid-cols-[0fr] transition-all group-hover/bubble:mx-2 group-hover/bubble:my-1 group-hover/bubble:grid-cols-[1fr]">
        <div className="grid grid-rows-[0fr] transition-all group-hover/bubble:grid-rows-[1fr]">
          <div className="flex flex-col gap-0 overflow-hidden">
            <span className="whitespace-nowrap text-sm font-medium leading-none text-black">
              {author.username}
            </span>
            <span className="w-[200px] max-w-[200px] text-sm text-black">
              {comment.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackBubble;
