"use client";

import { useState } from "react";
import useComments from "./hooks/useComments";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Spinner from "@/app/components/Spinner/Spinner";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import TextInput from "@/app/components/Inputs/TextInput";
import { TwicImg } from "@twicpics/components/react";

type CommentSectionProps = {
  artworkId: string;
};

const CommentSection = ({ artworkId }: CommentSectionProps) => {
  const {
    commentsWithoutFeedback: comments,
    commentsLoading,
    sendComment,
  } = useComments(artworkId);

  const { user } = useClerk();

  const [value, setValue] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendComment(value);
      setValue("");
    } catch (e) {
      console.error(e);
    }
    setSending(false);
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="leading-none">Comments</span>
        {user && (
          <form
            onSubmit={onSubmit}
            className="flex flex-row items-center gap-3"
          >
            <TextInput
              label=""
              onChange={setValue}
              value={value}
              placeholder="Say something nice!"
            />
            {/* <input
              className="h-9 flex-grow rounded-full bg-bg-600 px-4 text-sm font-light leading-none focus:outline-none"
              placeholder="Say something nice!"
              value={value}
              disabled={sending}
              onChange={(e) => setValue(e.target.value)}
            /> */}
            <button
              type="submit"
              disabled={!value}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-transparent transition-all disabled:opacity-50 md:hover:bg-bg-600"
            >
              {sending ? (
                <Spinner className="h-5 w-5 fill-white" />
              ) : (
                <PaperAirplaneIcon className="h-5 w-5" />
              )}
            </button>
          </form>
        )}
      </div>
      {commentsLoading ? (
        <div className="flex flex-col gap-5">
          <div className="flex w-full flex-row gap-3">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-bg-600"></div>
            <div className="flex w-full flex-col gap-1">
              <div className="h-3 w-32 rounded-full bg-bg-600"></div>
              <div className="h-6 w-full rounded-full bg-bg-600"></div>
            </div>
          </div>
          <div className="flex w-full flex-row gap-3">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-bg-600"></div>
            <div className="flex w-full flex-col gap-1">
              <div className="h-3 w-32 rounded-full bg-bg-600"></div>
              <div className="h-6 w-full rounded-full bg-bg-600"></div>
            </div>
          </div>
          <div className="flex w-full flex-row gap-3">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-bg-600"></div>
            <div className="flex w-full flex-col gap-1">
              <div className="h-3 w-32 rounded-full bg-bg-600"></div>
              <div className="h-6 w-full rounded-full bg-bg-600"></div>
            </div>
          </div>
        </div>
      ) : comments.length ? (
        <div className="flex flex-col gap-5">
          {comments.map((comment) => {
            if (!comment.author) return;
            return (
              <div key={comment.comment.id} className="flex flex-row gap-3">
                <Link href={`/user/${comment.author.username}`}>
                  <TwicImg
                    src={`/users/${
                      comment.author.imageUrl.split("/").slice(-1)[0]
                    }`}
                    className="h-8 w-8 rounded-full"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <Link
                    className="text-sm leading-none opacity-50"
                    href={`/user/${comment.author.username}`}
                  >
                    {comment.author.username}
                  </Link>
                  <span className="font-light leading-snug opacity-75">
                    {comment.comment.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <span className="text-sm leading-none opacity-75">No comments yet</span>
      )}
    </div>
  );
};

export default CommentSection;
