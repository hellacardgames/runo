import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { games } from "../games.js";
import { startRound } from "../utils/startRound.js";

type StartGameResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error:
        | "gameNotFound"
        | "playerNotFound"
        | "invalidStatus"
        | "playerNotAdmin"
        | "minPlayersNotReached";
    };

export function startGame(gameId: string, playerId: string): StartGameResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const player = game.playerList.findById(playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.status !== "open") {
    return { success: false, error: "invalidStatus" };
  }
  if (player !== game.playerList.getAt(0)) {
    return { success: false, error: "playerNotAdmin" };
  }
  if (game.playerList.length < MIN_PLAYERS) {
    return { success: false, error: "minPlayersNotReached" };
  }
  startRound(game);
  game.status = "started";
  game.expiresAt = Date.now() + EXPIRY_EXTENSION_MS;
  // emitEvent(startedGame, { type: "gameStarted" });
  // emitEvent(startedGame, {
  //   type: "expirationUpdated",
  //   expiresAt: startedGame.expiresAt,
  // });
  return { success: true };
}
