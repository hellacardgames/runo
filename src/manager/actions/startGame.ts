import { startGame as doStartGame } from "../../game/actions/startGame.js";
import { games } from "../games.js";

type StartGameResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error:
        | "gameNotFound"
        | "invalidStatus"
        | "playerNotFound"
        | "playerNotAdmin"
        | "minPlayersNotReached";
    };

export function startGame(gameId: string, playerId: string): StartGameResult {
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
