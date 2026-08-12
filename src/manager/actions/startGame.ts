import { startGame as doStartGame } from "../../actions/startGame.js";
import { games } from "../games.js";

export function startGame(gameId: string, playerId: string) {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "created") {
    return { success: false, error: "invalidStatus" };
  }

  const result = doStartGame(game, playerId);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return { success: true };
}
