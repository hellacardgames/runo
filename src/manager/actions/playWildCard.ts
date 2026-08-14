import { playWildCard as doPlayWildCard } from "../../game/actions/playWildCard.js";
import { games } from "../games.js";
import type { Color } from "../../game/types/Card.js";

type PlayWildCardResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "invalidStatus";
    }
  | DoPlayWildCardError;

type DoPlayWildCardError = Extract<DoPlayWildCardResult, { success: false }>;

type DoPlayWildCardResult = ReturnType<typeof doPlayWildCard>;

export function playWildCard(
  gameId: string,
  playerId: string,
  cardId: string,
  color: Color,
): PlayWildCardResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" };
  }

  const result = doPlayWildCard(game, playerId, cardId, color);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return { success: true };
}
