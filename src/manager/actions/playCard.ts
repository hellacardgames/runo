import { playCard as doPlayCard } from "../../actions/playCard.js";
import { games } from "../games.js";

export function playCard(gameId: string, playerId: string, cardId: string) {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" };
  }

  const result = doPlayCard(game, playerId, cardId);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return { success: true };
}
