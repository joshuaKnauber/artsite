import { atom } from "jotai";

export const posXAtom = atom<number>(0);
export const posYAtom = atom<number>(0);
export const scaleAtom = atom<number>(1);

export const panningAtom = atom<boolean>(false);

export const mousePosAtom = atom<{ x: number; y: number }>({ x: 0, y: 0 });
export const relMousePosAtom = atom<{ x: number; y: number }>({ x: 0, y: 0 });

type Reaction = {
  key: string;
  emoji: string;
  position: { x: number; y: number };
};

export const reactionsAtom = atom<Reaction[]>([]);

export const playReaction = (
  setReactions: (
    reactions: Reaction[] | ((reactions: Reaction[]) => Reaction[])
  ) => void,
  emoji: string,
  position: { x: number; y: number }
) => {
  setReactions((reactions) => [
    ...reactions,
    { key: crypto.randomUUID(), emoji, position },
  ]);
  setTimeout(() => {
    setReactions((reactions) => reactions.slice(1));
  }, 2000);
};
