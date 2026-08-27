import { createClientFactory } from "@hellacardgames/lib";
import type { Manager } from "../manager/createManager.js";
import type { Server } from "../server/createServer.js";

export type Client = ReturnType<typeof createClient>;

export const createClient = createClientFactory<Server, Manager>({
  drawCard: (gameId: string, playerId: string) => ({
    gameId,
    playerId,
  }),
  playCard: (gameId: string, playerId: string, cardId: string) => ({
    gameId,
    playerId,
    cardId,
  }),
  playWildCard: (gameId, playerId, cardId, color) => ({
    gameId,
    playerId,
    cardId,
    color,
  }),
});
