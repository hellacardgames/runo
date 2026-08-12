import { joinGame as doJoinGame } from "../../actions/joinGame.js";
import { games } from "../games.js";

export function joinGame(gameId: string, userId: string, username: string) {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "created") {
    return { success: false, error: "invalidStatus" };
  }

  const result = doJoinGame(game, userId, username);
  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return {
    success: true,
    playerId: result.playerId,
  };
}
