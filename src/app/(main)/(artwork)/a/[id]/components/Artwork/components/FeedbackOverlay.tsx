"use client";

import Spinner from "@/app/components/Spinner/Spinner";
import { Image } from "@/db/schema";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import useFeedbackBubbles from "../../hooks/useFeedbackBubbles";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import FeedbackBubble from "./FeedbackBubble";

type FeedbackOverlayProps = {
  image: Image;
};

const FeedbackOverlay = ({ image }: FeedbackOverlayProps) => {
  const { user } = useClerk();

  const [showFeedback, setShowFeedback] = useState<boolean>(true);

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
    feedback: comments,
  } = useFeedbackBubbles(image.artwork_id, image.id);

  const onSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setSendingFeedback(true);
    try {
      await sendFeedback(feedback);
      setFeedback("");
      setShowFeedback(true);
    } catch (e) {
      console.error(e);
    }
    setSendingFeedback(false);
  };

  return (
    <div
      className="absolute left-0 top-0 hidden h-full w-full md:block"
      ref={refContainer}
      onMouseMove={onMouseMove}
      onMouseLeave={onImgLeave}
      onClick={onClickImg}
      onContextMenu={onRightClick}
    >
      <div
        className={`transition-all duration-300 ${
          showFeedback ? "opacity-100" : "opacity-0"
        }`}
      >
        {comments.map((comment) => (
          <FeedbackBubble feedback={comment} key={comment.comment.id} />
        ))}
      </div>
      {user && (
        <div
          ref={refComment}
          className="absolute flex origin-top-left flex-row items-center gap-2 rounded-full rounded-bl-sm bg-white p-1 shadow-md"
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
      )}
      <div className="absolute bottom-2 right-2 z-10 flex flex-row items-center gap-2">
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="hidden h-9 w-9 items-center justify-center rounded-md bg-black bg-opacity-50 transition-all md:flex md:hover:bg-opacity-60"
        >
          {showFeedback ? (
            <EyeSlashIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
        {user && (
          <button
            onClick={onClickFeedback}
            className="hidden h-9 w-9 items-center justify-center rounded-md bg-black bg-opacity-50 transition-all md:flex md:hover:bg-opacity-60"
          >
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackOverlay;
