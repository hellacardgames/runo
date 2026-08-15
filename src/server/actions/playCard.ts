import { z } from "zod";
import { playCard as doPlayCard } from "../../manager/actions/playCard.js";

export type PlayCardResult =
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
        | "cardIsWild"
        | "cardNotPlayable";
    };

const inputSchema = z
  .object({
    gameId: z.string(),
    playerId: z.string(),
    cardId: z.string(),
  })
  .transform(
    ({ gameId, playerId, cardId }) => [gameId, playerId, cardId] as const,
  );

export function playCard(input: unknown): PlayCardResult {
  const parseResult = inputSchema.safeParse(input);
  if (!parseResult.success) {
    return { success: false, error: "invalidInput" };
  }
  return doPlayCard(...parseResult.data);
}
