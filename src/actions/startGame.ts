import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { emitEvent } from "../lib/emitEvent.js";
import { startRound } from "../lib/startRound.js";
import { transitionGameToStarted } from "../lib/transitionGameToStarted.js";
import type { CreatedGame, StartedGame } from "../types/Game.js";

type StartGameResult =
  | {
      readonly success: true;
      readonly game: StartedGame;
    }
  | {
      readonly success: false;
      readonly error:
        "playerNotFound" | "playerNotAdmin" | "minPlayersNotReached";
    };

export function startGame(
  game: CreatedGame,
  playerId: string,
): StartGameResult {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.players.indexOf(player) !== 0) {
    return { success: false, error: "playerNotAdmin" };
  }
  if (game.players.length < MIN_PLAYERS) {
    return { success: false, error: "minPlayersNotReached" };
  }

  let startedGame = transitionGameToStarted(game);

  startedGame = { ...startedGame, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };

  startedGame = startRound(startedGame);

  startedGame = emitEvent(startedGame, { type: "gameStarted" });
  startedGame = emitEvent(startedGame, {
    type: "expirationUpdated",
    expiresAt: startedGame.expiresAt,
  });

  return { success: true, game: startedGame };
}
