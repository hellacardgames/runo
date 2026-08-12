import { drawCard as doDrawCard } from "../../actions/drawCard.js";
import { games } from "../games.js";

export function drawCard(gameId: string, playerId: string) {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" };
  }

  const result = doDrawCard(game, playerId);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return { success: true };
}
