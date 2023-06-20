import { atom } from "jotai";

export const posXAtom = atom<number>(0);
export const posYAtom = atom<number>(0);
export const scaleAtom = atom<number>(1);

export const panningAtom = atom<boolean>(false);

export const mousePosAtom = atom<{ x: number; y: number }>({ x: 0, y: 0 });
