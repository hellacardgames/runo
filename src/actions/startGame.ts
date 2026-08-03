import { emitEvent } from "@hellacardgames/lib";
import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { games } from "../games.js";
import { startRound } from "../lib/startRound.js";

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
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.status !== "open") {
    return { success: false, error: "invalidStatus" };
  }
  if (game.players.indexOf(player) !== 0) {
    return { success: false, error: "playerNotAdmin" };
  }
  if (game.players.length < MIN_PLAYERS) {
    return { success: false, error: "minPlayersNotReached" };
  }
  startRound(game);
  game.status = "started";
  game.expiresAt = Date.now() + EXPIRY_EXTENSION_MS;
  emitEvent(game, { type: "gameStarted" });
  emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });
  return { success: true };
}
