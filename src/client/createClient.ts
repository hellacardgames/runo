import { createClientFactory } from "@hellacardgames/lib";
import type { createManager } from "../manager/createManager.js";
import type { createServer } from "../server/createServer.js";

export const createClient = createClientFactory<
  ReturnType<typeof createServer>,
  ReturnType<typeof createManager>
>({
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
