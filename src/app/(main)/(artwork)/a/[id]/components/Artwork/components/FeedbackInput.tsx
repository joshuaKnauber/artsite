"use client";

import Spinner from "@/app/components/Spinner/Spinner";
import { Image } from "@/db/schema";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import useFeedbackBubbles from "../../hooks/useFeedbackBubbles";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";

type FeedbackInputProps = {
  image: Image;
};

const FeedbackInput = async ({ image }: FeedbackInputProps) => {
  const { user } = useClerk();

  const [feedback, setFeedback] = useState<string>("");
  const [sendingFeedback, setSendingFeedback] = useState<boolean>(false);

  const {
    refContainer,
    refComment,
    mousePos,
    inSelection,
    isWriting,
    onClickFeedback,
    onClickImg,
    onMouseMove,
    onRightClick,
    onImgLeave,
    sendFeedback,
    feedbacks,
  } = useFeedbackBubbles(image.artwork_id, image.id);

  const onSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setSendingFeedback(true);
    try {
      await sendFeedback(feedback);
      setFeedback("");
    } catch (e) {
      console.error(e);
    }
    setSendingFeedback(false);
  };

  if (!user) return null;

  return (
    <>
      <div
        ref={refComment}
        className="absolute flex origin-bottom-left flex-row items-center gap-2 rounded-full rounded-bl-sm bg-white p-1 shadow-md"
        style={{
          left: `${mousePos[0]}%`,
          top: `${mousePos[1]}%`,
          scale: inSelection || isWriting ? 1 : 0,
          transform: "translateY(-100%)",
          transition: "scale 0.2s ease-in-out",
          pointerEvents: inSelection ? "none" : "all",
        }}
      >
        {sendingFeedback ? (
          <Spinner className="h-6 w-6 flex-shrink-0 rounded-full" />
        ) : (
          <img
            src={user.profileImageUrl}
            className="h-6 w-6 flex-shrink-0 rounded-full"
          />
        )}
        {isWriting && (
          <form
            onSubmit={onSubmitFeedback}
            className="flex flex-row items-center gap-2"
          >
            <input
              autoFocus
              disabled={sendingFeedback}
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Feedback..."
              className="h-6 w-24 rounded-full text-sm text-black focus:outline-none"
            />
            <button
              type="submit"
              disabled={sendingFeedback || !feedback}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-black bg-opacity-0 transition-all disabled:opacity-50 md:hover:bg-opacity-10"
            >
              <PaperAirplaneIcon className="h-4 w-4 text-black" />
            </button>
          </form>
        )}
      </div>
      <div className="absolute bottom-2 right-2 z-10 flex flex-row items-center gap-2">
        <button
          onClick={onClickFeedback}
          className="hidden h-8 w-8 items-center justify-center rounded-md bg-black bg-opacity-50 transition-all md:flex md:hover:bg-opacity-60"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute left-0 top-0 h-full w-full bg-red-500 bg-opacity-20"></div>
    </>
  );
};

export default FeedbackInput;
