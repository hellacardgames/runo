import { z } from "zod";
import { createServerFactory } from "@hellacardgames/lib";
import { createManager } from "../manager/index.js";
import { COLORS } from "../game/index.js";

export const createServer = createServerFactory(createManager, {
  drawCard: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
    })
    .transform(({ gameId, playerId }) => [gameId, playerId] as const),

  playCard: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
      cardId: z.string(),
    })
    .transform(
      ({ gameId, playerId, cardId }) => [gameId, playerId, cardId] as const,
    ),

  playWildCard: z
    .object({
      gameId: z.string(),
      playerId: z.string(),
      cardId: z.string(),
      color: z.enum(COLORS),
    })
    .transform(
      ({ gameId, playerId, cardId, color }) =>
        [gameId, playerId, cardId, color] as const,
    ),
});
