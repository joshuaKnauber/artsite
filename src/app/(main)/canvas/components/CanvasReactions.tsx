"use client";

import { useEventListener } from "./liveblocks.config";
import { useAtom } from "jotai";
import { playReaction, reactionsAtom } from "./atoms/canvasAtoms";

const CanvasReactions = () => {
  const [reactions, setReactions] = useAtom(reactionsAtom);

  useEventListener(({ connectionId, event }) => {
    const { emoji, emojiPosition } = event;
    if (event.type === "EMOJI" && emoji && emojiPosition) {
      playReaction(setReactions, emoji, emojiPosition);
    }
  });

  return (
    <>
      {reactions.map(({ emoji, position, key }) => (
        <div
          key={key}
          className="pointer-events-none fixed z-10 text-lg"
          style={{
            transform: `translate(${position.x - 30}px, ${position.y - 30}px)`,
          }}
        >
          <div className="animate-emojifloat transition-all duration-500">
            {emoji}
          </div>
        </div>
      ))}
    </>
  );
};

export default CanvasReactions;
