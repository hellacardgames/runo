import { leaveGame as doLeaveGame } from "../../actions/leaveGame.js";
import { games } from "../games.js";

export function leaveGame(gameId: string, playerId: string) {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }

  const result = doLeaveGame(game, playerId);
  if (!result.success) {
    return result;
  }

  if (result.game.players.length > 0) {
    games.set(gameId, result.game);
  } else {
    games.delete(gameId);
  }

  return { success: true };
}
