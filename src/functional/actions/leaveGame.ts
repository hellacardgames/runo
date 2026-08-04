import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { emitEvent } from "../lib/emitEvent.js";
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

  const removeResult = removePlayer(game, player);
  game = removeResult.game;
  if (removeResult.turnChanged) {
    game = emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
    });
  }

  game = {
    ...game,
    discardPile: [
      ...player.hand.map((c) => {
        if (c.type === "wild") {
          return { type: "discardedWild", card: c, color: "blue" } as const;
        }
        return c;
      }),
      ...game.discardPile,
    ],
  };

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
