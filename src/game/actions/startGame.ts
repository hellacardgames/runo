import { emitEvent, isPlayerAdmin } from "@hellacardgames/lib";
import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { startRound } from "../lib/startRound.js";
import { transitionGameToStarted } from "../lib/transitionGameToStarted.js";
import type { Game } from "../types/Game.js";

export function startGame(game: Game, playerId: string) {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
  }
  if (!isPlayerAdmin(game, player.id)) {
    return { success: false, error: "playerNotAdmin" } as const;
  }
  if (game.status !== "created") {
    return { success: false, error: "invalidStatus" } as const;
  }
  if (game.players.length < MIN_PLAYERS) {
    return { success: false, error: "minPlayersNotReached" } as const;
  }

  game = transitionGameToStarted(game);
  game = emitEvent(game, { type: "gameStarted" });

  game = startRound(game);

  game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
  game = emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });

  return { success: true, game } as const;
}
