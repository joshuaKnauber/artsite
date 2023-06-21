"use client";

import Spinner from "@/app/components/Spinner/Spinner";
import { Image } from "@/db/schema";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { ArrowDownIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import useFeedbackBubbles from "../../hooks/useFeedbackBubbles";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import FeedbackBubble from "./FeedbackBubble";
import { TwicImg } from "@twicpics/components/react";

type FeedbackOverlayProps = {
  image: Image;
};

const FeedbackOverlay = ({ image }: FeedbackOverlayProps) => {
  const { user } = useClerk();

  const [showFeedback, setShowFeedback] = useState<boolean>(true);

  const [feedback, setFeedback] = useState<string>("");
  const [sendingFeedback, setSendingFeedback] = useState<boolean>(false);

  const [showTutorial, setShowTutorial] = useState<boolean>(false);

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

  useEffect(() => {
    const seenTutorial = Boolean(localStorage.getItem("seenTutorial"));
    setShowTutorial(!seenTutorial);
    if (!seenTutorial) {
      const interval = setInterval(() => {
        // continue checking to hide on all on canvas
        if (localStorage.getItem("seenTutorial")) {
          setShowTutorial(false);
          clearInterval(interval);
        }
      }, 1000);
    }
  }, []);

  const inRightHalf = mousePos[0] > 50;

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
          className={`absolute flex origin-top-left flex-row items-center gap-2 rounded-full bg-white p-1 shadow-md ${
            inRightHalf ? "rounded-br-sm" : "rounded-bl-sm"
          }`}
          style={{
            left: inRightHalf ? "unset" : `${mousePos[0]}%`,
            right: inRightHalf ? `${100 - mousePos[0]}%` : "unset",
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
            <TwicImg
              src={`/users/${user.imageUrl.split("/").slice(-1)[0]}`}
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
        {comments.length > 0 && (
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
        )}
        {user && (
          <button
            onClick={(e) => {
              setShowTutorial(false);
              localStorage.setItem("seenTutorial", "true");
              onClickFeedback(e);
            }}
            className="relative hidden h-9 w-9 items-center justify-center rounded-md bg-black bg-opacity-50 transition-all md:flex md:hover:bg-opacity-60"
          >
            {showTutorial && (
              <div className="absolute -top-1 right-0 -translate-y-full">
                <div className="animate-bounce rounded-md bg-bg-500">
                  <div className="flex h-9 flex-row items-center gap-3 rounded-md border border-orange-400 bg-orange-900 bg-opacity-20 px-4 pr-3 text-sm text-orange-400">
                    <span className="whitespace-nowrap">
                      Click here to comment
                    </span>
                    <ArrowDownIcon className="h-4 w-4 flex-shrink-0" />
                  </div>
                </div>
              </div>
            )}
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackOverlay;
