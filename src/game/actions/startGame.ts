import { emitEvent } from "@hellacardgames/lib";
import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { startRound } from "../lib/startRound.js";
import { transitionGameToStarted } from "../lib/transitionGameToStarted.js";
import type { Game } from "../types/Game.js";

export function startGame(game: Game, playerId: string) {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
  }
  if (game.players.indexOf(player) !== 0) {
    return { success: false, error: "playerNotAdmin" } as const;
  }
  if (game.status !== "created") {
    return { success: false, error: "invalidStatus" } as const;
  }
  if (game.players.length < MIN_PLAYERS) {
    return { success: false, error: "minPlayersNotReached" } as const;
  }

  let startedGame = transitionGameToStarted(game);

  startedGame = { ...startedGame, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };

  startedGame = startRound(startedGame);

  startedGame = emitEvent(startedGame, { type: "gameStarted" });
  startedGame = emitEvent(startedGame, {
    type: "expirationUpdated",
    expiresAt: startedGame.expiresAt,
  });

  return { success: true, game: startedGame } as const;
}
