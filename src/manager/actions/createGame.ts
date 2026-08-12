import { createGame as doCreateGame } from "../../actions/createGame.js";
import { MAX_GAMES } from "../constants.js";
import { games } from "../games.js";

type CreateGameResult =
  | {
      readonly success: true;
      readonly gameId: string;
      readonly playerId: string;
    }
  | {
      readonly success: false;
      readonly error: "maxGamesReached";
    };

export function createGame(userId: string, username: string): CreateGameResult {
  if (games.size === MAX_GAMES) {
    return { success: false, error: "maxGamesReached" };
  }

  const result = doCreateGame(userId, username);

  games.set(result.game.id, result.game);

  return {
    success: true,
    gameId: result.game.id,
    playerId: result.playerId,
  };
}
