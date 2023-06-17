"use client";

import { CommentWithAuthor } from "../../hooks/useComments";

type FeedbackBubbleProps = {
  feedback: CommentWithAuthor;
};

const FeedbackBubble = ({ feedback }: FeedbackBubbleProps) => {
  const { comment, author } = feedback;

  if (!author) return null;

  const inRightHalf = parseInt(comment.feedback_image_x || "0") > 50;

  return (
    <div
      key={comment.id}
      className={`scale-in group/bubble absolute flex w-[250px] origin-bottom-left scale-0 flex-row hover:z-10 hover:p-1 ${
        inRightHalf ? "justify-end" : "justify-start"
      }`}
      style={{
        left: inRightHalf ? "unset" : `${comment.feedback_image_x}%`,
        right: inRightHalf
          ? `${100 - parseInt(comment.feedback_image_x || "0")}%`
          : "unset",
        bottom: `calc(100% - ${comment.feedback_image_y}%)`,
      }}
    >
      <div
        className={`flex w-fit flex-row items-start justify-end rounded-2xl bg-white p-1 shadow-md ${
          inRightHalf ? "rounded-br-sm" : "rounded-bl-sm"
        }`}
      >
        <img
          src={author.profileImageUrl}
          className="h-5 w-5 flex-shrink-0 rounded-full transition-all duration-200 group-hover/bubble:mt-0.5"
        />
        <div className="mx-0 my-0 grid grid-cols-[0fr] transition-all duration-200 group-hover/bubble:mx-2 group-hover/bubble:my-1 group-hover/bubble:grid-cols-[1fr]">
          <div className="grid grid-rows-[0fr] transition-all duration-200 group-hover/bubble:grid-rows-[1fr]">
            <div className="flex flex-col gap-1 overflow-hidden">
              <span className="whitespace-nowrap text-sm font-medium leading-none text-black">
                {author.username}
              </span>
              <span className="text-sm leading-tight text-black">
                {comment.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackBubble;
