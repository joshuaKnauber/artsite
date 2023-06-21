"use client";

import Link from "next/link";
import { CommentWithAuthor } from "../../hooks/useComments";
import { TwicImg } from "@twicpics/components/react";

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
      className={`scale-in group/bubble absolute flex w-fit origin-bottom-left scale-0 flex-row hover:z-10 ${
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
        className={`flex w-fit flex-row items-start justify-end rounded-2xl bg-white p-1 shadow-md transition-all group-hover/bubble:p-2 ${
          inRightHalf ? "rounded-br-sm" : "rounded-bl-sm"
        }`}
      >
        <Link href={`/user/${author.username}`}>
          <TwicImg
            src={`/users/${author.imageUrl.split("/").slice(-1)[0]}`}
            className="h-5 w-5 flex-shrink-0 rounded-full transition-all duration-200"
          />
        </Link>
        <div className="grid grid-cols-[0fr] grid-rows-[0fr] overflow-hidden transition-all group-hover/bubble:grid-cols-[1fr] group-hover/bubble:grid-rows-[1fr]">
          <div className="ml-0 flex w-fit flex-col gap-1 overflow-hidden transition-all group-hover/bubble:ml-2">
            <Link
              href={`/user/${author.username}`}
              className="whitespace-nowrap text-sm font-medium leading-none text-black"
            >
              {author.username}
            </Link>
            <span className="w-max max-w-[250px] text-sm leading-tight text-black">
              {comment.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackBubble;
