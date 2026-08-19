import { z } from "zod";
import { playWildCard as doPlayWildCard, COLORS } from "../../manager/index.js";

export type PlayWildCardResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error:
        | "invalidInput"
        | "gameNotFound"
        | "invalidStatus"
        | "playerNotFound"
        | "outOfTurn"
        | "cardNotFound"
        | "cardNotWild"
        | "cardNotPlayable";
    };

const inputSchema = z
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

export function playWildCard(input: unknown): PlayWildCardResult {
  const parseResult = inputSchema.safeParse(input);
  if (!parseResult.success) {
    return { success: false, error: "invalidInput" };
  }
  return doPlayWildCard(...parseResult.data);
}
