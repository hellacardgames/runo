import { createGame as doCreateGame } from "../../actions/createGame.js";
import { games } from "../games.js";

export function createGame(userId: string, username: string) {
  const result = doCreateGame(userId, username);

  games.set(result.game.id, result.game);

  return {
    success: true,
    gameId: result.game.id,
    playerId: result.playerId,
  };
}
