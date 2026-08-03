import { EXPIRY_EXTENSION_MS, MIN_PLAYERS } from "../constants.js";
import { games } from "../games.js";
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
  const player = game.playerList.findById(playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  // emitEvent(game, { type: "playerLeft", username: player.username });
  game.playerList.remove(player);
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
  if (game.playerList.length === 2 && game.playerList.isReversed) {
    game.playerList.changeDirection();
    // emitEvent(game, { type: "directionChanged", isReversed: game.isReversed });
  }
  if (game.status === "started" && game.playerList.length < MIN_PLAYERS) {
    game.status = "forfeited";
    game.expiresAt = Date.now() + EXPIRY_EXTENSION_MS;
    // emitEvent(forfeitedGame, { type: "gameForfeited" });
    // emitEvent(forfeitedGame, {
    //   type: "expirationUpdated",
    //   expiresAt: forfeitedGame.expiresAt,
    // });
  }
  if (game.playerList.length === 0) {
    games.delete(game.id);
  }
  return { success: true };
}
