import { playWildCard as doPlayWildCard } from "../../actions/playWildCard.js";
import { isColor } from "../../lib/isColor.js";
import { games } from "../games.js";

export function playWildCard(
  gameId: string,
  playerId: string,
  cardId: string,
  color: string,
) {
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
