import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { games } from "../games.js";
import { emitEvent } from "../lib/emitEvent.js";
import { removePlayer } from "../lib/removePlayer.js";
import type { DiscardedCard } from "../types/Card.js";

type LeaveGameResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

export function leaveGame(gameId: string, playerId: string): LeaveGameResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const playerIndex = game.players.findIndex((p) => p.id === playerId);
  if (playerIndex === -1) {
    return { success: false, error: "playerNotFound" };
  }

  const player = game.players[playerIndex]!;
  emitEvent(game, { type: "playerLeft", username: player.username });

  const { turnChanged } = removePlayer(game, player);
  if (turnChanged) {
    emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
    });
  }

  const cardsToReturn = player.hand.splice(0);
  for (const c of cardsToReturn) {
    let discard: DiscardedCard;
    if (c.type === "wild") {
      discard = { type: "discardedWild", card: c, color: "blue" };
    } else {
      discard = c;
    }
    game.discardPile.unshift(discard);
  }

  if (game.players.length === 2 && game.isReversed) {
    game.isReversed = false;
    emitEvent(game, { type: "directionChanged", isReversed: game.isReversed });
  }

  if (game.status === "started" && game.players.length < MIN_PLAYERS) {
    game.status = "forfeited";
    game.expiresAt = Date.now() + EXPIRY_EXTENSION_MS;
    emitEvent(game, { type: "gameForfeited" });
    emitEvent(game, {
      type: "expirationUpdated",
      expiresAt: game.expiresAt,
    });
  }
  if (game.players.length === 0) {
    games.delete(game.id);
  }
  return { success: true };
}
