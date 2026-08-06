import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { discardLeavingPlayerCards } from "../lib/discardLeavingPlayerCards.js";
import { emitEvent } from "../lib/emitEvent.js";
import { getCurrentPlayer } from "../lib/getCurrentPlayer.js";
import { removePlayer } from "../lib/removePlayer.js";
import type { Game } from "../types/Game.js";

type LeaveGameResult =
  | {
      readonly success: true;
      readonly game: Game;
    }
  | {
      readonly success: false;
      readonly error: "playerNotFound";
    };

export function leaveGame(game: Game, playerId: string): LeaveGameResult {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }

  game = emitEvent(game, { type: "playerLeft", username: player.username });

  if (game.status === "started") {
    game = discardLeavingPlayerCards(game, player.id);
  }

  const removePlayerResult = removePlayer(game, player.id);
  game = removePlayerResult.game;

  if (removePlayerResult.turnChanged) {
    game = emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: getCurrentPlayer(game).username,
    });
  }

  if (game.players.length === 2 && game.isReversed) {
    const isReversed = false;
    game = {
      ...emitEvent(game, { type: "directionChanged", isReversed }),
      isReversed,
    };
  }

  if (game.status === "started" && game.players.length < MIN_PLAYERS) {
    game = {
      ...game,
      status: "forfeited",
      expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    };
    game = emitEvent(game, { type: "gameForfeited" });
    game = emitEvent(game, {
      type: "expirationUpdated",
      expiresAt: game.expiresAt,
    });
  }

  return { success: true, game };
}
