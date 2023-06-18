import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey:
    "pk_dev_HHp-K3q0wdpYBYXBhVpj69eHfAufFERQlyQQEpCE5VjhckkJ1N56QHrl-kEF_8T9",
});

export type Presence = {
  userId: string | null;
  cursor: { x: number; y: number } | null;
};

export const { RoomProvider, useOthers, useUpdateMyPresence } =
  createRoomContext<Presence>(client);
