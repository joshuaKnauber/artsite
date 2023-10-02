import { PostComment } from "@/app/api/artworks/[artwork]/comments/route";
import { useEffect, useRef, useState } from "react";
import useComments from "./useComments";

const useFeedbackBubbles = (artworkId: string, imageId: number) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refComment = useRef<HTMLDivElement>(null);

  const { refetchComments, commentsWithFeedback } = useComments(artworkId);

  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  const [inSelection, setInSelection] = useState<boolean>(false);
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const onClickFeedback = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = refContainer.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos([
      ((e.clientX - rect.left) / rect.width) * 100,
      ((e.clientY - rect.top) / rect.height) * 100,
    ]);
    setInSelection(true);
  };

  const onClickImg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!inSelection || !refContainer.current) return;
    e.stopPropagation();
    setInSelection(false);
    setIsWriting(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!inSelection || !refContainer.current) return;
    const rect = refContainer.current.getBoundingClientRect();
    setMousePos([
      ((e.clientX - rect.left) / rect.width) * 100,
      ((e.clientY - rect.top) / rect.height) * 100,
    ]);
  };

  const onRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!inSelection) return;
    e.preventDefault();
    setInSelection(false);
    setIsWriting(false);
  };

  const onImgLeave = () => {
    setInSelection(false);
  };

  const sendFeedback = async (text: string) => {
    const data: PostComment = {
      text,
      imageId,
      posX: mousePos[0],
      posY: mousePos[1],
    };
    const res = await fetch(`/api/artworks/${artworkId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error(res);
      throw new Error("Failed to send feedback");
    }
    await refetchComments();
    setIsWriting(false);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!isWriting || !refComment.current) return;
      if (!refComment.current.contains(e.target as Node)) {
        setInSelection(false);
        setIsWriting(false);
      }
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (!(inSelection || isWriting)) return;
      if (e.key === "Escape") {
        setInSelection(false);
        setIsWriting(false);
      }
    };

    window.addEventListener("click", onClickOutside);
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("click", onClickOutside);
      window.removeEventListener("keydown", onKeydown);
    };
  }, [inSelection, isWriting]);

  return {
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
    feedback: commentsWithFeedback,
  };
};

export default useFeedbackBubbles;
