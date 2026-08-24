import { z } from "zod";
import { createServerFactory } from "../lib/createServerFactory.js";
import { createManager } from "../manager/index.js";
import { COLORS } from "../game/index.js";

export const createServer = createServerFactory(createManager, (manager) => {
  const drawCardInputSchema = z
    .object({
      gameId: z.string(),
      playerId: z.string(),
    })
    .transform(({ gameId, playerId }) => [gameId, playerId] as const);

  function drawCard(input: unknown) {
    const parseResult = drawCardInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    return manager.drawCard(...parseResult.data);
  }

  const playCardInputSchema = z
    .object({
      gameId: z.string(),
      playerId: z.string(),
      cardId: z.string(),
    })
    .transform(
      ({ gameId, playerId, cardId }) => [gameId, playerId, cardId] as const,
    );

  function playCard(input: unknown) {
    const parseResult = playCardInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    return manager.playCard(...parseResult.data);
  }

  const playWildCardInputSchema = z
    .object({
      gameId: z.string(),
      playerId: z.string(),
      cardId: z.string(),
      color: z.enum(COLORS),
    })
    .transform(
      ({ gameId, playerId, cardId, color }) =>
        [gameId, playerId, cardId, color] as const,
    );

  function playWildCard(input: unknown) {
    const parseResult = playWildCardInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    return manager.playWildCard(...parseResult.data);
  }

  return [
    { path: "/drawCard", action: drawCard },
    { path: "/playCard", action: playCard },
    { path: "/playWildCard", action: playWildCard },
  ];
});
