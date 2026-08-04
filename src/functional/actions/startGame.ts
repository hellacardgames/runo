import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { emitEvent } from "../lib/emitEvent.js";
import { startRound } from "../lib/startRound.js";
import type { Game } from "../types/Game.js";

type StartGameResult =
  | {
      readonly success: true;
      readonly game: Game;
    }
  | {
      readonly success: false;
      readonly error:
        | "playerNotFound"
        | "invalidStatus"
        | "playerNotAdmin"
        | "minPlayersNotReached";
    };

export function startGame(game: Game, playerId: string): StartGameResult {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.status !== "created") {
    return { success: false, error: "invalidStatus" };
  }
  if (game.players.indexOf(player) !== 0) {
    return { success: false, error: "playerNotAdmin" };
  }
  if (game.players.length < MIN_PLAYERS) {
    return { success: false, error: "minPlayersNotReached" };
  }

  game = startRound(game);

  game = {
    ...game,
    status: "started",
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
  };

  game = emitEvent(game, { type: "gameStarted" });
  game = emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });

  return { success: true, game };
}
