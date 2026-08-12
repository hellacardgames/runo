import { playWildCard as doPlayWildCard } from "../../actions/playWildCard.js";
import { isColor } from "../../lib/isColor.js";
import { games } from "../games.js";

type PlayWildCardResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "invalidStatus" | "invalidColor";
    }
  | DoPlayWildCardError;

type DoPlayWildCardError = Extract<DoPlayWildCardResult, { success: false }>;

type DoPlayWildCardResult = ReturnType<typeof doPlayWildCard>;

export function playWildCard(
  gameId: string,
  playerId: string,
  cardId: string,
  color: string,
): PlayWildCardResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" };
  }
  if (!isColor(color)) {
    return { success: false, error: "invalidColor" };
  }

  const result = doPlayWildCard(game, playerId, cardId, color);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return { success: true };
}
