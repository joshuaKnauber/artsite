"use client";

import { useAtomValue, useSetAtom } from "jotai";
import {
  mousePosAtom,
  playReaction,
  reactionsAtom,
  relMousePosAtom,
} from "./atoms/canvasAtoms";
import { useEffect, useState } from "react";
import { useBroadcastEvent, useUpdateMyPresence } from "./liveblocks.config";

const CanvasInteractions = () => {
  const mousePos = useAtomValue(mousePosAtom);
  const relMousePos = useAtomValue(relMousePosAtom);
  const setReactions = useSetAtom(reactionsAtom);

  const [showHelp, setShowHelp] = useState<boolean>(true);

  const [showChat, setShowChat] = useState<boolean>(false);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);

  const [chat, setChat] = useState<string>("");
  const [showTypingInfo, setShowTypingInfo] = useState<boolean>(false);

  const [selectedEmoji, setSelectedEmoji] = useState<string>("");

  const broadcast = useBroadcastEvent();
  const updateMyPresence = useUpdateMyPresence();

  const EMOJIS = ["👋", "👏", "👍", "😍", "👀", "💯"];

  const onKeyDown = (e: KeyboardEvent) => {
    // show chat
    if (
      e.code === "Space" &&
      !(showChat || showEmojis) &&
      e.target === document.body
    ) {
      window.localStorage.setItem("seenCanvasHelp", "true");
      setShowHelp(false);
      e.preventDefault();
      e.stopPropagation();
      setShowChat(true);
      setSelectedEmoji("");
    }
    // show emojis
    else if (
      e.code === "KeyE" &&
      !(showChat || showEmojis) &&
      e.target === document.body
    ) {
      window.localStorage.setItem("seenCanvasHelp", "true");
      setShowHelp(false);
      setShowEmojis(true);
    }
    // show typing info
    else if (e.code === "Enter" && showChat) {
      setShowTypingInfo(true);
      setTimeout(() => {
        setShowTypingInfo(false);
      }, 2000);
    }
    // close interactions
    else if (e.code === "Escape" && (showChat || showEmojis || selectedEmoji)) {
      setShowChat(false);
      setShowEmojis(false);
      setChat("");
      setSelectedEmoji("");
    }
    // select emoji
    else if (
      parseInt(e.key) <= EMOJIS.length &&
      parseInt(e.key) > 0 &&
      showEmojis
    ) {
      setSelectedEmoji(EMOJIS[parseInt(e.key) - 1]);
      setShowEmojis(false);
    }
  };

  const onMouseDown = () => {
    if (showChat || showEmojis) {
      setShowChat(false);
      setShowEmojis(false);
      setChat("");
    }
    if (selectedEmoji) {
      broadcast({
        type: "EMOJI",
        emoji: selectedEmoji,
        emojiPosition: relMousePos,
      });
      playReaction(setReactions, selectedEmoji, relMousePos);
    }
  };

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (showChat || showEmojis || selectedEmoji) {
      setShowChat(false);
      setShowEmojis(false);
      setSelectedEmoji("");
      setChat("");
    } else {
      setShowEmojis(true);
    }
  };

  useEffect(() => {
    updateMyPresence({
      chat: showChat ? chat : "",
    });
  }, [chat, showChat, updateMyPresence]);

  useEffect(() => {
    if (!window.localStorage.getItem("seenCanvasHelp")) {
      setShowHelp(true);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onMouseDown);
    document.addEventListener("contextmenu", onContextMenu);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onMouseDown);
      document.removeEventListener("contextmenu", onContextMenu);
    };
  }, [relMousePos, showChat, showEmojis, selectedEmoji]);

  return (
    <>
      {showHelp && (
        <div
          className="pointer-events-none fixed z-20 hidden h-6 items-center justify-center rounded-md border border-white border-opacity-20 bg-bg-600 px-2 text-xs leading-none tracking-wider text-white text-opacity-50 md:flex"
          style={{
            transform: `translate(${mousePos.x + 20}px, ${mousePos.y - 12}px)`,
          }}
        >
          [SPACE] to chat, [E] for emojis
        </div>
      )}
      {selectedEmoji && (
        <span
          className="pointer-events-none fixed text-lg"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        >
          {selectedEmoji}
        </span>
      )}
      {(showChat || showEmojis) && (
        <>
          <div
            className="pointer-events-none fixed flex flex-col-reverse gap-1"
            style={{
              transform: `translate(calc(${mousePos.x}px + 16px), ${mousePos.y}px)`,
            }}
          >
            {showTypingInfo && (
              <span className="absolute -top-7 left-0 flex h-6 animate-fade items-center justify-center whitespace-nowrap rounded-full bg-bg-600 px-3 text-xs font-light text-white text-opacity-50">
                Others see what you type as you type!
              </span>
            )}
            {showEmojis && (
              <div className="-top-10 z-10 flex h-9 -translate-y-1/2 flex-row items-center gap-7 rounded-full border border-white border-opacity-20 bg-bg-600 px-4">
                {EMOJIS.map((emoji, i) => (
                  <span key={emoji} className="relative text-xs">
                    {emoji}
                    <span className="absolute -bottom-1.5 -right-2.5 text-xs font-light leading-none opacity-50">
                      {i + 1}
                    </span>
                  </span>
                ))}
                <span className="text-xs font-light opacity-50">[ESC]</span>
              </div>
            )}
            {showChat && (
              <input
                className="h-10 w-full rounded-2xl rounded-tl-sm border border-white border-opacity-20 bg-bg-600 px-4 text-sm font-light focus:outline-none"
                onChange={(e) => setChat(e.target.value)}
                value={chat}
                placeholder="Chat"
                autoFocus
              ></input>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CanvasInteractions;
